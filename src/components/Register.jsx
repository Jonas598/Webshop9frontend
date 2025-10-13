import React, { useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData) // zum Testen
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Registrierung</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Passwort" value={formData.password} onChange={handleChange} />
        <input type="text" name="address" placeholder="Adresse" value={formData.address} onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrieren</button>
      </form>
    </div>
  )
}

export default Register
