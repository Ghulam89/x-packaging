import React, { useState, memo, useCallback, useMemo } from 'react'
import Input from '../common/Input'
import Select from '../common/Select'
import Textarea from '../common/Textarea'
import Button from '../common/Button'
import axios from 'axios'
import { BaseUrl } from '../../utils/BaseUrl'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const QuoteForm = memo(({ product }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);

    const initialFormState = {
        name: "",
        email: "",
        companyName: "",
        phoneNumber: "",
        boxStyle: "",
        length: "",
        width: "",
        depth: "",
        unit: "Inches",
        stock: "Stock",
        color: "Colors",
        printingSides: "Inside",
        quantity: "",
        addons: "",
        image: null,
        message: "",
        pageUrl: typeof window !== "undefined" ? window.location.href : ""
    };

    const [formData, setFormData] = useState(initialFormState);

    const isValid = useMemo(() => {
        return (
            formData.boxStyle &&
            formData.length &&
            formData.width &&
            formData.depth &&
            formData.quantity
        );
    }, [formData.boxStyle, formData.length, formData.width, formData.depth, formData.quantity]);

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await axios.post(`${BaseUrl}/requestQuote/create`, formDataToSend);

            if (response.data.status === 'success') {
                navigate('/thank-you-page')
                setIsLoading(false);
                setFormData(initialFormState);
            } else {
                toast.error(response.data.message)
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setIsLoading(false);
        }
    }, [formData, navigate]);

    return (
        <form onSubmit={handleSubmit}>
            <div className=' grid grid-cols-3 pb-2 gap-2'>
                <div className=" w-full">
                    <Input
                        label="Name"
                        star={"*"}
                        name="name"
                        className=" rounded-lg"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </div>
                <div className=" w-full">
                    <Input
                        label="Email"
                        star={"*"}
                        name="email"
                        type="email"
                        className=" rounded-lg"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className=" w-full">
                    <Input
                        label="Phone Number"
                        star={"*"}
                        name="phoneNumber"
                        className=" rounded-lg"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                    />
                </div>
            </div>
            <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2">
                <div className=" w-full">
                    <Input
                        label="Box Style"
                        star={"*"}
                        name="boxStyle"
                        value={formData.boxStyle}
                        onChange={handleChange}
                        className=" rounded-lg"
                        placeholder="Box Style"
                        required
                    />
                </div>
                <div className=" w-full">
                    <Input
                        label="Size (Length)"
                        star={"*"}
                        name="length"
                        type="number"
                        className=" rounded-lg"
                        value={formData.length}
                        onChange={handleChange}
                        placeholder="Length"
                        required
                    />
                </div>
                <div className=" w-full">
                    <Input
                        label="Size (Width)"
                        star={"*"}
                        name="width"
                        type="number"
                        className=" rounded-lg"
                        value={formData.width}
                        onChange={handleChange}
                        placeholder="width"
                        required
                    />
                </div>
                <div className=" w-full">
                    <Input
                        label="Size (Depth)"
                        star={"*"}
                        name="depth"
                        type="number"
                        className=" rounded-lg"
                        value={formData.depth}
                        onChange={handleChange}
                        placeholder="Depth"
                        required
                    />
                </div>
                <div className=" w-full">
                    <Select
                        label="Unit"
                        name="unit"
                        className=" rounded-lg"
                        value={formData.unit}
                        onChange={handleChange}
                        required
                    >
                        <option value={'Inches'}>Inches</option>
                        <option value={'mm'}>mm</option>
                        <option value={'cm'}>cm</option>
                    </Select>
                </div>
                <div className=" w-full">
                    <Select
                        label="Stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    >
                        <option value={'Stock'}>Stock</option>
                        <option value={'12pt Cardboard'}>12pt Cardboard</option>
                        <option value={'14pt Cardboard'}>14pt Cardboard</option>
                        <option value={'16pt Cardboard'}>16pt Cardboard</option>
                        <option value={'18pt Cardboard'}>18pt Cardboard</option>
                        <option value={'20pt Cardboard'}>20pt Cardboard</option>
                        <option value={'22pt Cardboard'}>22pt Cardboard</option>
                        <option value={'24pt Cardboard'}>24pt Cardboard</option>
                        <option value={'White SBS C1S C25'}>White SBS C1S C25</option>
                        <option value={'Corrugated'}>Corrugated</option>
                        <option value={'Rigid'}>Rigid</option>
                        <option value={'Kraft'}>Kraft</option>
                        <option value={'Linen'}>Linen</option>
                    </Select>
                </div>
                <div className=" w-full">
                    <Select
                        label="Colors"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    >
                        <option value={'Colors'}>Colors</option>
                        <option value={'Plain (No Printing)'}>Plain (No Printing)</option>
                        <option value={'1 Color'}>1 Color</option>
                        <option value={'2 Color'}>2 Color</option>
                        <option value={'3 Color'}>3 Color</option>
                        <option value={'4 Color'}>4 Color</option>
                        <option value={'4/1 Color'}>4/1 Color</option>
                        <option value={'4/2 Color'}>4/2 Color</option>
                        <option value={'4/3 Color'}>4/3 Color</option>
                        <option value={'4/4 Color'}>4/4 Color</option>
                    </Select>
                </div>
                <div className=" w-full">
                    <Select
                        label="Printing Sides"
                        name="printingSides"
                        value={formData.printingSides}
                        onChange={handleChange}
                        required
                    >
                        <option value={'Inside'}>Inside</option>
                        <option value={'Outside'}>Outside</option>
                        <option value={'Both (Inside & Outside)'}>Both (Inside & Outside)</option>
                    </Select>
                </div>
                <div className=" w-full">
                    <Input
                        label="Quantity"
                        star={"*"}
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className=" rounded-lg"
                        required
                    />
                </div>
                <div className=" w-full">
                    <Select
                        label="Add-Ons"
                        name="addons"
                        className=" rounded-lg"
                        value={formData.addons}
                        onChange={handleChange}
                        placeholder="Select Add-Ons"
                    >
                        <option value={''}></option>
                        <option value={'Foiling'}>Foiling</option>
                        <option value={'Spot UV'}>Spot UV</option>
                        <option value={'Embossing'}>Embossing</option>
                        <option value={'Debossing'}>Debossing</option>
                        <option value={'handles'}>handles</option>
                        <option value={'Inserts'}>Inserts</option>
                        <option value={'Windows'}>Windows</option>
                    </Select>
                </div>
                <div className="col-span-5 grid grid-cols-1 mt-2 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="design_upload"
                            className="block pb-1.5 text-[#213554] text-sm font-semibold mb-1"
                        >
                            Upload Your Design
                            <span className="text-[#EE334B] ml-1">*</span>
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-2.5 text-center hover:border-[#213554] transition-all duration-300 bg-gradient-to-br from-gray-50 to-white group cursor-pointer flex flex-col justify-center" style={{ minHeight: '120px', height: '100%' }}>
                            <input
                                type="file"
                                name="image"
                                id="design_upload"
                                onChange={handleChange}
                                className="hidden"
                                accept=".png,.pdf,.jpg,.jpeg,.webp"
                            />
                            <label htmlFor="design_upload" className="cursor-pointer flex flex-col items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#213554]/10 to-[#EE334B]/10 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-[#213554]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <p className="text-sm text-[#213554] font-semibold mb-0.5 group-hover:text-[#EE334B] transition-colors duration-300">
                                    {formData.image ? formData.image.name : 'Click to upload or drag and drop'}
                                </p>
                                <p style={{fontSize: '11px'}} className=" text-gray-500">
                                    Max Size: 5MB | Allowed: PNG, PDF, JPG, JPEG, WEBP
                                </p>
                                {formData.image && (
                                    <div className="mt-2 px-3 py-1.5 bg-[#213554]/10 text-[#213554] rounded-lg text-xs font-medium">
                                        ✓ {formData.image.name}
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Textarea
                            label="Description"
                            name="message"
                            star={"*"}
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Tell us the size / dimensions, material, finising, add-ons, and design preferences."
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className=" w-full  flex justify-end mt-4">
                    <Button
                        type="submit"
                        label={isLoading ? "Sending..." : "Request A Quote"}
                        className={`bg-[#213554] w-full text-white ${!isValid || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isValid || isLoading}
                    />
                </div>
            </div>
        </form>
    );
});

QuoteForm.displayName = 'QuoteForm';
export default QuoteForm;
