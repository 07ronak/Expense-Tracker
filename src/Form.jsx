import React from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import categories from "./categories";

const schema = Joi.object({
  description: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Description cannot be empty",
    "string.min": "Description should be at least 3 characters",
    "string.max": "Description should not exceed 30 characters",
    "any.required": "Description is required",
  }),
  amount: Joi.number().min(0.01).max(100_000).required().messages({
    "number.base": "Amount must be a number",
    "number.min": "Amount must be at least 0.01",
    "number.max": "Amount cannot exceed 100,000",
    "any.required": "Amount is required",
  }),
  category: Joi.string()
    .valid(...categories)
    .required()
    .messages({
      "string.empty": "Category cannot be empty",
      "any.required": "Category is required",
      "any.only": `Category must be one of: ${categories.join(", ")}`,
    }),
});

const Form = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  return (
    <div className="mb-3">
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        noValidate
      >
        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <br />
          <input
            id="description"
            className="form-control"
            type="text"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="amount">
            Amount
          </label>
          <br />
          <input
            id="amount"
            className="form-control"
            type="number"
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="category">
            Category
          </label>
          <br />
          <select
            id="category"
            className="form-select"
            {...register("category")}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
