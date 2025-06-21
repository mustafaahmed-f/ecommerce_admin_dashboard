import { inputFieldType } from "@/app/_types/inputFieldType";
import { getErrObject } from "@/app/_utils/helperMethods/getErrObj";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FieldValues,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Progress } from "../../ui/progress";

interface ImageUploadFieldProps<T extends FieldValues>
  extends inputFieldType<T> {
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
}

function ImageUploadField<T extends FieldValues>({
  name,
  lable,
  required,
  setValue,
  errors,
}: ImageUploadFieldProps<T>) {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: File) => {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
      setValue(name, file as PathValue<T, typeof name>, {
        shouldValidate: true,
      });
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const errorObj = getErrObject<T>(errors, name);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    setImageFile(file);
    reader.readAsDataURL(file);
    setValue(name, file as PathValue<T, typeof name>, {
      shouldValidate: true,
    });
  }

  function handleRemoveImage() {
    setImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // ✅ clear input
    }
    setValue(name, null as PathValue<T, typeof name>, { shouldValidate: true });
  }

  function handleOpenUploader() {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  }

  return (
    <div className={`col-span-2 flex w-full flex-col items-start`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {lable}
        {required && <span className="ms-1 text-red-500">*</span>}
      </label>

      <div className="bg-muted flex w-full flex-col items-center rounded-xl p-1">
        <div className="flex w-full flex-wrap items-center gap-3 border-b-2 p-1 max-sm:justify-center sm:flex-nowrap sm:justify-between">
          <div className="w-fit overflow-hidden rounded-md text-white">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              placeholder="Upload Image"
              className="cursor-pointer rounded-md"
              ref={fileInputRef}
              hidden
            />
            <Button
              onClick={handleOpenUploader}
              variant={"outline"}
              className="border-primary text-primary hover:text-primary cursor-pointer border-2"
              type="button"
            >
              {image ? "Change Image" : "Upload Image"}
            </Button>
          </div>
          <div className="flex min-w-[220px] items-center gap-2 max-sm:flex-wrap sm:w-auto sm:min-w-[300px]">
            <div className="flex flex-row items-center gap-1 max-sm:mx-auto">
              <span className="whitespace-nowrap">
                {((imageFile?.size ?? 0) / 1024).toFixed(2)} KB
              </span>
              <span>/</span>
              <span className="whitespace-nowrap">1024 KB</span>
            </div>
            <Progress value={((imageFile?.size ?? 0) / 1024 / 1024) * 100} />
          </div>
        </div>
        {image ? (
          <div className="flex min-h-24 w-full flex-nowrap items-center justify-between p-1">
            <div className="flex max-w-1/2 items-center gap-2">
              <Image width={70} height={70} src={image} alt="Product" />
              <div className="flex flex-col gap-1">
                <span className="font-semibold break-all">
                  {imageFile?.name}
                </span>
                <span className="text-sm">{imageFile?.type}</span>
              </div>
            </div>
            <Button
              onClick={handleRemoveImage}
              className="h-8 w-8 cursor-pointer rounded-full border-red-500 p-2 text-red-500 hover:text-red-400"
              variant="outline"
              type="button"
            >
              X
            </Button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="flex min-h-40 w-full flex-col items-center justify-center gap-2 p-1"
          >
            <input {...getInputProps()} />
            <ImageIcon />
            <span>Drag and drop image here</span>
          </div>
        )}
      </div>

      {errorObj && (
        <p className="mt-1 text-xs text-red-600">{errorObj.message}</p>
      )}
    </div>
  );
}

export default ImageUploadField;
