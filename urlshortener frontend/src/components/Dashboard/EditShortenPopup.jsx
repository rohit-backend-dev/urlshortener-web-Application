import React, { useState } from "react";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useForm } from "react-hook-form";
import TextField from "../TextField";
import { Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import api from "../../api/api";
import toast from "react-hot-toast";

const EditShortenPopup = ({ open, setOpen, shortUrl, originalUrl, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { originalUrl: originalUrl || "" },
    mode: "onTouched",
  });

  const updateShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      await api.put(`/api/urls/${shortUrl}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      toast.success("URL Updated Successfully");
      refetch();
      setOpen(false);
    } catch (err) {
      toast.error("Updating URL Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="flex justify-center items-center bg-white rounded-md">
      <form
        onSubmit={handleSubmit(updateShortUrlHandler)}
        className="sm:w-[450px] w-[360px] relative shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >
        <h1 className="font-montserrat text-center font-bold sm:text-2xl text-[22px] text-slate-800">
          Edit URL
        </h1>

        <hr className="mt-2 mb-3 text-slate-950" />

        <TextField
          label="Enter New URL"
          required
          id="originalUrl"
          placeholder="https://updated-url.com"
          type="url"
          message="Url is required"
          register={register}
          errors={errors}
        />

        <button
          className="bg-custom-gradient font-semibold text-white w-32 py-2 rounded-md my-3"
          type="submit"
        >
          {loading ? "Updating..." : "Update"}
        </button>

        {!loading && (
          <Tooltip title="Close">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2"
            >
              <RxCross2 className="text-slate-800 text-3xl" />
            </button>
          </Tooltip>
        )}
      </form>
    </div>
  );
};

export default EditShortenPopup;
