import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/supabaseClient';
import ProjectedPayCalculator from './Profile';
import "../styles/tours.css"

function CustomInput({ placeholder, type, value, onChange }) {
  return <input type={type} placeholder={placeholder} value={value || ''} onChange={onChange} />;
}

function CustomCheckbox({ label, checked, onChange }) {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

function CustomSelect({ value, options, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      <option value="" disabled>Premium</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
}

export default function Tours() {
  const [Guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    name: '',
    owner: false,
    non_owner: false,
    gift: '',
    pay_per_tour: '',
    projected_pay: '',
    tour_date: '',
    notes: ''
  });
  const [premiums, setPremiums] = useState([]);
  const navigate = useNavigate();
  const [editGuestId, setEditGuestId] = useState(null);
  const [editedGuest, setEditedGuest] = useState({
    name: '',
    owner: false,
    non_owner: false,
    gift: '',
    pay_per_tour: '',
    projected_pay: '',
    tour_date: '',
    notes: ''
  });


  const fetchPremiums = async () => {
    try {
      const { data, error } = await supabase.from('Gifts').select('premium');
      if (error) throw error;
  
      setPremiums(data.sort((a, b) => a.premium.localeCompare(b.premium)));
    } catch (error) {
      console.error(`Fetching premiums failed: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchPremiums();
  }, []);

  const deleteGuest = async (id) => {
    try {
      const response = await fetch(`http://localhost:4005/api/Guests/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setGuests(Guests.filter((guest) => guest.guest_id !== id));
      }
    } catch (error) {
      console.error(`Delete failed: ${error.message}`);
    }
  };

  const addNewGuest = async () => {
    const updatedGuest = { ...newGuest };
    updatedGuest.owner = updatedGuest.owner ? 'Yes' : 'No';
    updatedGuest.non_owner = updatedGuest.non_owner ? 'Yes' : 'No';

    try {
      const response = await fetch('http://localhost:4005/api/Guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGuest),
      });

      const json = await response.json();
      if (response.ok) {
        setGuests([...Guests, json]);
        setNewGuest({
          name: '',
          owner: false,
          non_owner: false,
          gift: '',
          pay_per_tour: '',
          projected_pay: '',
          tour_date: '',
          notes: ''
        });
      }
    } catch (error) {
      console.error(`Add new guest failed: ${error.message}`);
    }
  };
  const startEditingGuest = (guest) => {
    setEditGuestId(guest.guest_id);
    const editedGuestData = { ...guest };
    editedGuestData.owner = editedGuestData.owner === 'Yes' || editedGuestData.owner === true;
    editedGuestData.non_owner = editedGuestData.non_owner === 'Yes' || editedGuestData.non_owner === true;
    setEditedGuest(editedGuestData);
  };

    const editedProjectedPay = ProjectedPayCalculator(editedGuest.pay_per_tour, editedGuest.gift);
    useEffect(() => {
      setEditedGuest(prevGuest => ({ ...prevGuest, projected_pay: editedProjectedPay }));
    }, [editedProjectedPay]);

  const updateGuest = async () => {
    const updatedEditedGuest = { ...editedGuest };
    updatedEditedGuest.owner = updatedEditedGuest.owner ? 'Yes' : 'No';
    updatedEditedGuest.non_owner = updatedEditedGuest.non_owner ? 'Yes' : 'No';

    try {
      const response = await fetch(`http://localhost:4005/api/Guests/${editGuestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEditedGuest),
      });

      if (response.ok) {
        setGuests(Guests.map((guest) => (guest.guest_id === editGuestId ? updatedEditedGuest : guest))); 
        setEditGuestId(null);
        setEditedGuest({
          name: '',
          owner: false,
          non_owner: false,
          gift: '',
          pay_per_tour: '',
          projected_pay: '',
          tour_date: '',
          notes: ''
        });
      }
    } catch (error) {
      console.error(`Update failed: ${error.message}`);
    }
  };

  const projectedPay = ProjectedPayCalculator(newGuest.pay_per_tour, newGuest.gift);
  useEffect(() => {
    setNewGuest(prevGuest => ({ ...prevGuest, projected_pay: projectedPay }));
  }, [projectedPay]);


  const renderGuestForm = (guest, setGuestFunction, submitFunction, buttonText, formClass) => (
    <form className={`custom-form ${formClass}`}>
      <CustomCheckbox label="Owner" checked={guest.owner} onChange={e => setGuestFunction({ ...guest, owner: e.target.checked, non_owner: !e.target.checked })} />
      <CustomCheckbox label="Non-Owner" checked={guest.non_owner} onChange={e => setGuestFunction({ ...guest, non_owner: e.target.checked, owner: !e.target.checked })} />
      <CustomInput placeholder="Name" type="text" value={guest.name} onChange={e => setGuestFunction({ ...guest, name: e.target.value })} />
      <CustomInput placeholder="Pay Per Tour" type="smallint" value={guest.pay_per_tour} onChange={e => setGuestFunction({ ...guest, pay_per_tour: e.target.value })} />
      <CustomSelect value={guest.gift} options={premiums.map(premiumObj => premiumObj.premium)} onChange={e => setGuestFunction({ ...guest, gift: e.target.value })} />
      <CustomInput placeholder="Projected Pay" type="smallint" value={guest.projected_pay} onChange={e => setGuestFunction({ ...guest, projected_pay: e.target.value })} />
      <CustomInput placeholder="Tour Date" type="date" value={guest.tour_date} onChange={e => setGuestFunction({ ...guest, tour_date: e.target.value })} />
      <CustomInput placeholder="Notes" type="text" value={guest.notes} onChange={e => setGuestFunction({ ...guest, notes: e.target.value })} />
      {buttonText === "Save" ? (
      <button className="save-button" type="button" onClick={submitFunction}>
        {buttonText}
      </button>
    ) : (
      <button type="button" onClick={submitFunction}>{buttonText}</button>
    )}
    </form>
  );

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_, session) => {
      const user = session?.user;

      if (user) {
        try {
          const response = await fetch('http://localhost:4005/api/Guests');
          const json = await response.json();
          setGuests(json);
        } catch (error) {
          console.error(`Fetch failed: ${error.message}`);
        }
      } else {
        navigate('/login');
      }
    });

    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
    };
  }, [navigate]);

  return (
    <div className="tours-container">
      <h1 className="tours-title">Tours</h1>
      <div className="add-new-guest">
        <h2>Add New Guest</h2>
        <div>
          {renderGuestForm(newGuest, setNewGuest, addNewGuest, "Add Guest", "add-new-guest-form")}
        </div>
      </div>
      <ul className="guest-list">
        {Guests.map((guest, index) => (
          <li key={index} className="guest-item">
            <div className="guest-card">
              <div className="guest-card-header">
                <div className="guest-name">{guest.name}</div>
                <div className="owner-status">Owner: {guest.owner}</div>
                <div className="non-owner-status">Non-Owner: {guest.non_owner}</div>
              </div>
              <div className="guest-card-body">
                <div className="guest-detail">{guest.gift}</div>
                <div className="guest-detail">Pay Per Tour: ${guest.pay_per_tour}</div>
                <div className="guest-detail">Projected Pay: ${guest.projected_pay}</div>
                <div className="guest-detail">Tour Date: {guest.tour_date}</div>
                <div className="guest-notes">{guest.notes}</div>
              </div>
              <div className="guest-card-footer">
                <div className="guest-actions">
                  {editGuestId === guest.guest_id ? (
                    renderGuestForm(editedGuest, setEditedGuest, updateGuest, "Save", "edit-guest-form")
                  ) : (
                    <button className="edit-button" onClick={() => startEditingGuest(guest)}>Edit</button>
                  )}
                  <button className="delete-button" onClick={() => deleteGuest(guest.guest_id)}>Delete</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}