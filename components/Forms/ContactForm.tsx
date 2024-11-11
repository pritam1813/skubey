"use client";
import React, { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  enquiry: z
    .string()
    .min(10, { message: "Enquiry must be at least 10 characters long" }),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    enquiry: "",
  });
  const [isLoading, setIsloading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const { name, email, enquiry } = formData;
      const validatedData = formSchema.parse(formData);
      console.log(name, email, enquiry);

      if (validatedData) {
        setErrors({});
        setFormData({ name: "", email: "", enquiry: "" });
        setSuccessMessage("Form submitted successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 10000);
      }

      setIsloading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        // Set validation errors
        const newErrors: Partial<FormData> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      setIsloading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <fieldset className="[&>div]:tw-mb-4">
        <legend className="tw-text-lg/5 tw-mb-3.75 tw-pb-2.5 tw-border-b tw-border-solid tw-border-borderColor tw-font-medium">
          Contact Form
        </legend>
        <div className="row">
          <label
            htmlFor="nameInput"
            className="col-sm-2 tw-text-sm/[1.5] tw-pb-[calc(.375rem+1px)] md:tw-text-right"
          >
            <span className="tw-text-[#f00]">* </span>
            Your Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              id="nameInput"
              className="tw-outline-0 tw-w-full tw-py-1.5 tw-px-2.5 tw-rounded-[20px] tw-h-10 tw-border tw-border-solid tw-border-borderColor"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <div className="text-danger">{errors.name}</div>
          </div>
        </div>
        <div className="row">
          <label
            htmlFor="emailInput"
            className="col-sm-2 tw-text-sm/[1.5] tw-pb-[calc(.375rem+1px)] md:tw-text-right"
          >
            <span className="tw-text-[#f00]">* </span>
            E-Mail Address
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              id="emailInput"
              className="tw-outline-0 tw-w-full tw-py-1.5 tw-px-2.5 tw-rounded-[20px] tw-h-10 tw-border tw-border-solid tw-border-borderColor"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <div className="text-danger">{errors.email}</div>
          </div>
        </div>
        <div className="row">
          <label
            htmlFor="enquiryInput"
            className="col-sm-2 tw-text-sm/[1.5] tw-pb-[calc(.375rem+1px)] md:tw-text-right"
          >
            <span className="tw-text-[#f00]">* </span>
            Enquiry
          </label>
          <div className="col-sm-10">
            <textarea
              rows={10}
              id="enquiryInput"
              className="tw-outline-0 tw-w-full tw-py-1.2 tw-px-5 tw-rounded-[30px] tw-h-[150px] tw-min-h-[calc(1.5em+.75rem+2px)] tw-border tw-border-solid tw-border-borderColor tw-text-secondaryLight tw-resize-none"
              value={formData.enquiry}
              onChange={(e) =>
                setFormData({ ...formData, enquiry: e.target.value })
              }
            />
            <div className="text-danger">{errors.enquiry}</div>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div className="text-success">{successMessage}</div>
      </fieldset>
      <div className="d-inline-block tw-pt-2 tw-w-full ">
        <div className="tw-text-end">
          <button
            aria-disabled={isLoading}
            className="tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary tw-py-2.5 tw-px-7.5 tw-text-sm tw-font-normal tw-rounded-cardcustom tw-transition-all tw-duration-500 tw-ease-in-out"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
