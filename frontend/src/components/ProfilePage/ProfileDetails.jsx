import React, { useEffect, useState } from "react";
import api from "../../api";
import "../../Styles/ProfileDetails.css";


export default function ProfileDetails() {
  const [profile, setProfile] = useState(null);
  const [address, setAddress] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const profRes = await api.get("/Profile/details");
      const addrRes = await api.get("/Profile/address");

      setProfile(profRes.data);
      setAddress(addrRes.data || {}); 
      setForm({ ...profRes.data, ...addrRes.data }); 
    };

    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    await api.post("/Profile/updateDetails", {
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phoneNumber,
      profileImageUrl: form.profileImageUrl,
    });
    await api.post("/Profile/updateAddress", {
      addressLine_1: form.addressLine_1,
      addressLine_2: form.addressLine_2,
      postalCode: form.postalCode,
      city: form.city,
    });
    setEditMode(false);
  };

  return (
    <div className="details">
      <section className="basic-info">
        <form>
          <h2>Account Details</h2>
          <h5>Basic Info</h5>
          <div className="content">
            <div id="form-firstname" className="input-group2">
              <label>Förnamn</label>
              <input name="firstName" value={form.firstName || ""} onChange={handleChange} disabled={!editMode} />
            </div>
            <div id="form-lastname" className="input-group2">
              <label>Efternamn</label>
              <input name="lastName" value={form.lastName || ""} onChange={handleChange} disabled={!editMode} />
            </div>
            <div id="form-email" className="input-group2">
              <label>Email</label>
              <input name="email" value={form.email || ""} disabled />
            </div>
            <div id="form-phone" className="input-group2">
              <label>Telefon</label>
              <input name="phoneNumber" value={form.phoneNumber || ""} onChange={handleChange} disabled={!editMode} />
            </div>
            <div className="form-buttons">
              {editMode ? (
                <>
                  <button type="button" className="btn-theme" onClick={handleSave}>Spara</button>
                  <button type="button" className="btn-gray" onClick={() => setEditMode(false)}>Avbryt</button>
                </>
              ) : (
                <button type="button" className="btn-theme" onClick={() => setEditMode(true)}>Ändra</button>
              )}
            </div>
          </div>
        </form>
      </section>

      <section className="address-info">
        <form>
          <h5>Adress</h5>
          <div className="content">
            <div id="form-addressline-1" className="input-group2">
              <label>Gatuadress</label>
              <input name="addressLine_1" value={form.addressLine_1 || ""} onChange={handleChange} disabled={!editMode} />
            </div>
            <div id="form-addressline-2" className="input-group2">
              <label>Adressrad 2 (valfritt)</label>
              <input name="addressLine_2" value={form.addressLine_2 || ""} onChange={handleChange} disabled={!editMode} />
            </div>
            <div id="form-postalcode" className="input-group2">
              <label>Postnummer</label>
              <input name="postalCode" value={form.postalCode || ""} onChange={handleChange} disabled={!editMode} />
            </div>
            <div id="form-city" className="input-group2">
              <label>Stad</label>
              <input name="city" value={form.city || ""} onChange={handleChange} disabled={!editMode} />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}