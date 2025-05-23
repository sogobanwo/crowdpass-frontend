import {
  Bookmark,
  Calendar,
  Share2,
  ArrowLeft,
  Copy,
  Check,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { epochToDatetime } from "datetime-epoch-conversion";
import useBuyTicket from "@/hooks/write-hooks/useBuyTicket";
import { StarknetContext } from "@/contexts/UserContext";
import HashLoader from "react-spinners/HashLoader";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useIsTicketHolder from "@/hooks/read-hooks/useIsTicketHolder";
import useClaimRefund from "@/hooks/write-hooks/useClaimRefund";

const EventDetails = ({ eventDetails, id }: any) => {
  const { address, isLoading } = useContext(StarknetContext);
  const handlePurchase = useBuyTicket();
  const router = useRouter();
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const { data } = useIsTicketHolder(id, address as `0x${string}`);

  const { event }: any = eventDetails;
  const response = epochToDatetime(`${Number(event?.start_date)}`);
  const refund = useClaimRefund()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  function convertTime(time: string) {
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5);
    let ampm = parseInt(hours) >= 12 ? "PM" : "AM";

    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    } else if (parseInt(hours) == 0) {
      hours = "12";
    }

    return hours + ":" + minutes + " " + ampm;
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Share Modal */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="bg-[#14141A] border border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Share Event
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-gray-300 mb-2">
              Copy the link below to share this event
            </p>
            <div className="flex items-center bg-black/30 rounded-md p-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full bg-transparent text-white outline-none flex-1 mr-2 overflow-hidden text-ellipsis"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyLink}
                className="hover:bg-gray-700"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-white" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="text-green-500 text-sm mt-2">
                Link copied to clipboard!
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Back Button */}
      <div className="my-4">
        <Button
          onClick={handleGoBack}
          variant="ghost"
          className="flex items-center gap-2 text-white hover:text-primary hover:bg-transparent"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row mx-4 lg:mx-28 gap-4 lg:gap-10">
        {isLoading && (
          <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50">
            <HashLoader
              color={"#FF6932"}
              loading={isLoading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <div className="text-white text-2xl">Purchasing Tickets...</div>
          </div>
        )}
        <Image
          src={event?.image}
          alt="event-image"
          width={384}
          height={467}
          className="rounded-3xl w-full md:w-96 object-center object-cover"
        />
        <div className="flex flex-col gap-4 lg:w-full lg:gap-6">
          <div>
            <p className="text-primary">
              {Number(event?.ticket_price) > 0
                ? `${Number(event?.ticket_price)} STRK`
                : "FREE"}
            </p>
            <h1 className="raleway text-2xl md:text-4xl text-white font-semibold">
              {event?.name}
            </h1>
          </div>
          <div className="bg-[#CBCACF66] flex gap-2 rounded-lg lg:max-w-80 py-2 px-3">
            <div className="bg-[#14141A] p-2 rounded-xl">
              <Calendar size={30} color="#FF6932" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-white">
                {response.day} {response.month}, {response.year}
              </p>
              <p className="text-white text-sm">{convertTime(response.time)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <div className="flex items-center justify-center">
                <Image
                  src={
                    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee1_hvftrx.png"
                  }
                  alt="attendee1"
                  width={50}
                  height={50}
                  className="w-8 h-8 md:w-[50px] md:h-[50px]"
                />
                <Image
                  src={
                    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee2_fuynig.png"
                  }
                  alt="attendee2"
                  width={50}
                  height={50}
                  className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
                />
                <Image
                  src={
                    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee3_pwpu24.png"
                  }
                  alt="attendee3"
                  width={50}
                  height={50}
                  className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
                />
                <Image
                  src={
                    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/attendee5_b81v8c.png"
                  }
                  alt="attendee4"
                  width={50}
                  height={50}
                  className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
                />
                <Image
                  src={
                    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/attendee4_swblfx.png"
                  }
                  alt="attendee5"
                  width={50}
                  height={50}
                  className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
                />
                <p className="text-primary flex justify-center items-center text-sm p-2 bg-white rounded-full -ml-3 border-2 border-primary">
                  {Number(event?.total_tickets) - 5}+
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-white">Participant</p>
                <p className="font-medium text-sm text-white">
                  Across the globe
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end lg:w-full gap-8 items-center">
            <div className="pt-4 flex gap-4">
              <Button
                variant="ghost"
                className="p-0 h-auto hover:bg-transparent"
                onClick={() => setShareOpen(true)}
              >
                <Share2 size={40} fill="#ffffff" color="#ffffff" />
              </Button>
            </div>

            {data === false && (
              <Button
                className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4 flex justify-center items-center"
                onClick={async () => {
                  await handlePurchase(id, Number(event?.ticket_price));
                }}
              >
                Register
              </Button>
            )}
            {data === true && (
              <Button
                className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4 flex justify-center items-center "
                disabled
                onClick={async () => {
                  await refund(id, address as `0x${string}`);
                }}
              >
                Reclaim Refund
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
