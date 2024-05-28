
    import React, { useState, useEffect } from "react";
    import { toast } from "react-toastify";
    // import { useHistory } from 'react-router-dom';
    import { useNavigate } from 'react-router-dom';

    import '../styless/add.css';

    export default function AddProduct() {
        const [brands, setBrands] = useState([]);
        const [models, setModels] = useState([]);
        const [bodyTypes, setBodyTypes] = useState([]);
        const [transmissions, setTransmissions] = useState([]);
        const [locations, setLocations] = useState([]);
        const [brand, setBrand] = useState("");
        const [model, setModel] = useState("");
        const [year, setYear] = useState(new Date().getFullYear());
        const [bodyType, setBodyType] = useState("");
        const [seats, setSeats] = useState(5);
        const [price, setPrice] = useState("");
        const [transmission, setTransmission] = useState("");

        const [location, setLocation] = useState("");
        const [mainPhoto, setMainPhoto] = useState(null);
        const [description, setDescription] = useState("");
        const [email, setEmail] = useState("");

        // const history = useHistory();
        const navigate = useNavigate();
        useEffect(() => {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                // setIsLoggedIn(true);
                setEmail(userData.email);
            }
        }, [])

        useEffect(() => {
            fetchBrands();
            fetchBodyTypes();
            fetchTransmissions();
            fetchLocations();
        }, []);

        const fetchBrands = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/get-brands/");
                const data = await response.json();
                setBrands(data.brands);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        const fetchModelsByBrand = async (brandId) => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/get-models-by-brand/${brandId}`);
                const data = await response.json();
                setModels(data.models);
            } catch (error) {
                console.error("Error fetching models by brand:", error);
            }
        };

        const fetchBodyTypes = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/get-body-types/");
                const data = await response.json();
                setBodyTypes(data.bodyTypes);
            } catch (error) {
                console.error("Error fetching body types:", error);
            }
        };

        const fetchTransmissions = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/get-transmissions/");
                const data = await response.json();
                setTransmissions(data.transmissions);
            } catch (error) {
                console.error("Error fetching transmissions:", error);
            }
        };

        const fetchLocations = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/get-locations/");
                const data = await response.json();
                setLocations(data.locations);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        const handleBrandChange = (e) => {
            const selectedBrand = e.target.value;
            setBrand(selectedBrand);
            fetchModelsByBrand(selectedBrand);
        };

        const handleMainPhotoChange = (e) => {
            const file = e.target.files[0];
            setMainPhoto(file);
        };

        const handleSubmit = async () => {
            if (!mainPhoto) {
                toast.error("Please upload a main photo");
                return;
            }

            try {
                const formData = new FormData();
                formData.append("main_photo", mainPhoto);
                formData.append("brand", brand);
                formData.append("model", model);
                formData.append("year", year);
                formData.append("body_type", bodyType);
                formData.append("seats", seats);
                formData.append("price", price);
                formData.append("transmission", transmission);
                formData.append("location", location);
                formData.append("description", description);
                formData.append("email", email);

                const response = await fetch("http://127.0.0.1:8000/add/", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    toast.success("Successfully Added Product To Database");
                    // history.push('/');
                    setTimeout(() => {
                        navigate('/'); // Перенаправление на страницу main через 2 секунды
                    }, 1000);
                } else {
                    const errorData = await response.json();
                    toast.error(`Error Adding Product To Database: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Error uploading main photo to server:", error);
                toast.error("Error Adding Product To Database");
            }
        };

        return (
            <div className="admin__section">
                <h2>Add Product</h2>
                <div className="form-grid">
                    <div className="group">
                        <select value={brand} onChange={handleBrandChange}>
                            <option value="">Select Brand</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                        <span className="highlight"></span><span className="bar"></span>
                        <label>Brand:</label>
                    </div>
                    <div className="group">
                        <select value={model} onChange={(e) => setModel(e.target.value)}>
                            <option value="">Select Model</option>
                            {models.map(model => (
                                <option key={model.id} value={model.id}>{model.name}</option>
                            ))}
                        </select>
                        <span className="highlight"></span><span className="bar"></span>
                        <label>Model:</label>
                    </div>
                    <div className="group">
                        <select value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
                            <option value="">Select Body Type</option>
                            {bodyTypes.map(bodyType => (
                                <option key={bodyType.id} value={bodyType.id}>{bodyType.name}</option>
                            ))}
                        </select>
                        <span className="highlight"></span><span className="bar"></span>
                        <label>Body Type:</label>
                    </div>
                    <div className="group">
                        <select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                            <option value="">Select Transmission</option>
                            {transmissions.map(transmission => (
                                <option key={transmission.id} value={transmission.id}>{transmission.name}</option>
                            ))}
                        </select>
                        <span className="highlight"></span><span className="bar"></span>
                        <label>Transmission:</label>
                    </div>


                    <div className="group">
                        <select value={location} onChange={(e) => setLocation(e.target.value)}>
                            <option value="">Select Location</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                        </select>
                        <span className="highlight"></span><span className="bar"></span>
                        <label>Location:</label>
                    </div>

                    <div className="group">
                        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                        <span className="highlight"></span><span className="bar"></span>
                        <label>Year:</label>
                    </div>
                    <div className="group">
                        <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} />
                        <span className="highlight"></span><span className="bar"></span>
                        <label>Seats:</label>
                    </div>
                    <div className="group">
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <span className="highlight"></span><span className="bar"></span>
                        <label>Price:</label>
                    </div>
                    {/*<div className="group">*/}
                    {/*    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />*/}
                    {/*    <span className="highlight"></span><span className="bar"></span>*/}
                    {/*    <label>Location:</label>*/}
                    {/*</div>*/}

                    <div className="group">
                        <input type="file" onChange={handleMainPhotoChange} />
                        <span className="highlight"></span><span className="bar"></span>
                        <label>Main Photo:</label>
                    </div>
                    <div className="group">
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <span className="highlight"></span><span className="bar"></span>
                        <label>Description:</label>
                    </div>
                    {/*<div className="group">*/}
                    {/*    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />*/}
                    {/*    <span className="highlight"></span><span className="bar"></span>*/}
                    {/*    <label>Email:</label>*/}
                    {/*</div>*/}
                    <div className="group">
                        <button onClick={handleSubmit}>Add Product</button>
                    </div>
                </div>
            </div>
        );
    }

