"use client";
import Image from "next/image";
import { usersType } from "../types/usersType";
import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { Button } from "@/app/_components/ui/button";

interface DetailsUIProps {
  singleRecord: usersType;
}

const getOrNA = (value?: any) =>
  value === null || value === undefined || value === "" ? "N/A" : value;

function DetailsUI({ singleRecord: user }: DetailsUIProps) {
  const { router } = useNextNavigation();
  return (
    <div className="h-full w-full">
      <div className="mb-2 flex w-full justify-start">
        <Button
          variant={"link"}
          onClick={() => router.back()}
          className="cursor-pointer text-black hover:underline"
        >
          {"← "}
          back
        </Button>
      </div>
      <div className="mx-auto my-auto h-fit w-fit max-w-[60%] rounded-lg border py-3 shadow-sm">
        {/* Top Section */}
        <div className="flex flex-col gap-4 border-b p-4 sm:flex-row">
          <div className="flex shrink-0 items-center justify-center sm:border-r-2 sm:pe-3">
            <Image
              src={user.profileImage || "/default-avatar.png"}
              alt="User Image"
              width={120}
              height={120}
              className="rounded-full border object-cover"
            />
          </div>
          <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
            <p>
              <strong>Username:</strong> {user.userName}
            </p>
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {getOrNA(user.phoneNumber)}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 sm:gap-4">
          <p>
            <strong>Street No.:</strong> {getOrNA(user.address?.street_number)}
          </p>
          <p>
            <strong>Unit No.:</strong> {getOrNA(user.address?.unit_number)}
          </p>
          <p>
            <strong>Address Line 1:</strong>{" "}
            {getOrNA(user.address?.address_line1)}
          </p>
          <p>
            <strong>Address Line 2:</strong>{" "}
            {getOrNA(user.address?.address_line2)}
          </p>
          <p>
            <strong>City:</strong> {getOrNA(user.address?.city)}
          </p>
          <p>
            <strong>Country:</strong> {getOrNA(user.address?.country)}
          </p>
          <p>
            <strong>Latitude:</strong> {getOrNA(user.address?.geolocation?.lat)}
          </p>
          <p>
            <strong>Longitude:</strong>{" "}
            {getOrNA(user.address?.geolocation?.long)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsUI;
