"use client";

import EventAnalytics from "@/components/dashboard/analytics-tabs/EventAnalytics";
import EventCheckin from "@/components/dashboard/analytics-tabs/EventCheckin";
import EventAnalyticsDetailsPage from "@/components/events/EventAnalyticsDetailsPage";
import { StarknetContext } from "@/contexts/UserContext";
import useGetEventById from "@/hooks/read-hooks/useGetEventById";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

type Props = {};

const page = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const detailsTabs = ["Details", "Analytics", "Checkin"];
  const params = useParams<{ id: string }>();
  const eventDetails = useGetEventById(Number(params.id));
  const { isLoading }: any = useContext(StarknetContext);

  const ActiveComponent = () => {
    switch (tabIndex) {
      case 0:
        return (
          <EventAnalyticsDetailsPage
            eventDetails={eventDetails}
            id={Number(params.id)}
          />
        );
      case 1:
        return <EventAnalytics eventDetails={eventDetails}
/>;
      case 2:
        return <EventCheckin id={Number(params.id)} />;
      default:
        return (
          <EventAnalyticsDetailsPage
            eventDetails={eventDetails}
            id={Number(params.id)}
          />
        );
    }
  };
  return (
    <div className="bg-[#14141A] rounded-xl w-full p-10 flex flex-col gap-3">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-white text-xl raleway font-medium">
          Event Portfolio
        </h1>
        {isLoading && (
          <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50">
            <HashLoader
              color={"#FF6932"}
              loading={isLoading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <div className="text-white text-2xl">
              Performing your operation...
            </div>
          </div>
        )}
        <ul className="flex justify-between underline underline-offset-4 gap-4">
          {detailsTabs.map((tab, index) => (
            <li
              key={index}
              className={`cursor-pointer ${
                tabIndex === index
                  ? "text-primary underline underline-offset-4"
                  : "text-white/50"
              }`}
              onClick={() => setTabIndex(index)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <ActiveComponent />
    </div>
  );
};

export default page;
