import { useState } from "react";
import { Calendar, Clock, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Home Page Component
const HomePage = ({ onNavigate }: any) => {
  return (
    <>
      <div className="min-h-screen bg-[#0c1a25] flex">
        {/* Left Image Section */}
        <div className="w-2/3 h-screen relative ">
          <img
            src="/Images/2.jpg"
            alt="futsal"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right Content Section */}
        <div className="w-1/3 flex flex-col justify-center items-center text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              <span className="text-[#00f0ff]">S</span>7{" "}
              <span className="text-[#00f0ff]">Futsal</span>
              <br />
              <p className="text-[50px]">
                <span className="text-[#00f0ff]">&</span> Sports
              </p>
            </h1>
            <p className="text-[26px] mb-2 font-bold">Your Game, Your Court</p>
            <p className="text-[18px] mb-2 italic">
              Book Your Court in a Click!
            </p>
            <p className="text-[18px] mb-5 italic">Kickoff & Have Fun</p>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-[#00f0ff] text-black px-10 py-4 text-[18px] font-semibold hover:bg-white hover:text-black hover:border-black"
            >
              Go Ahead!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const ContactPage = ({ onNavigate }: any) => {
  return (
    <>
      <div className="min-h-screen bg-[#0c1a25] flex">
        {/* Left content */}
        <div className="w-1/3 flex flex-col justify-center items-center text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              <span className="text-[#00f0ff]">S</span>7{" "}
              <span className="text-[#00f0ff]">Futsal</span>
              <br />
              <p className="text-[50px]">
                <span className="text-[#00f0ff]">&</span> Sports
              </p>
            </h1>
            <p className="text-[26px] mb-2 font-bold">Connect with us,</p>
            <p className="text-[18px] mb-2 italic">
              Just click the <span className="text-[#00f0ff]">Book Now! </span>{" "}
              and Book your slots soon!
            </p>
            <div className="mb-5 w-full">
              <form>
                <Card className="bg-[#0c1a25] border-none">
                  <CardContent>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="w-full bg-white mt-4 p-4 rounded-md"
                      required
                    />
                  </CardContent>
                  <CardContent>
                    <input
                      type="tel"
                      placeholder="Enter Your Mobile Number"
                      className="w-full bg-white mt-4 p-4 rounded-md"
                      required
                      pattern="[0-9]{10}"
                    />
                  </CardContent>
                </Card>
              </form>
            </div>
            <button
              type="submit"
              onClick={() => onNavigate("booking")}
              className="bg-[#00f0ff] text-black px-10 py-4 text-[18px] font-semibold hover:bg-white hover:text-black hover:border-black mb-5"
            >
              Book Now!
            </button>
            <br />
            <button
              onClick={() => onNavigate("home")}
              className="bg-[#00f0ff] text-black px-12 py-4 text-[20px] font-semibold hover:bg-white hover:text-black hover:border-black"
            >
              Go Back
            </button>
          </div>
        </div>

        <div className="w-2/3 h-screen relative">
          <img
            src="/Images/4.jpg"
            alt="futsal"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

// Booking Page Component
const BookingPage = ({ onNavigate }: any) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<{
    id: number;
    name: string;
    price: number;
  } | null>(null);

  const courts = [
    { id: 1, name: "Court A", price: 3500.0, type: "Indoor" },
    { id: 2, name: "Court B", price: 3500.0, type: "Indoor" },
    { id: 3, name: "Court C", price: 3500.0, type: "Indoor" },
  ];

  const timeSlots = [
    "09 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    " 1 AM",
    " 2 PM",
    " 3 PM",
    " 4 PM",
    " 5 PM",
    " 6 PM",
    " 7 PM",
    " 8 PM",
    " 9 PM",
    "10 PM",
    "11 PM",
  ];

  const handleBooking = (court: any) => {
    if (selectedDate && selectedTime) {
      setSelectedCourt(court);
      setShowConfirmation(true);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex bg-[#0c1a25]">
        {/* Image Section */}
        <div className="w-2/3 relative h-screen w-[1400px]">
          <img
            src="/Images/5.jpg"
            alt="futsal"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-1/3 flex flex-col justify-center items-center text-white px-5 ">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-6">
              Futsal Court Booking
            </h1>

            {/* Buttons */}
            <button
              onClick={() => onNavigate("home")}
              className="bg-[#00f0ff] text-black font-medium px-6 py-2 rounded-lg mb-4 hover:bg-white"
            >
              ← Back to Home
            </button>

            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    <Calendar className="w-5 h-5" /> Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg text-white"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    <Clock className="w-5 h-5" /> Select Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        className={`p-2 rounded-lg text-sm transition-colors ${
                          selectedTime === time
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Court List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {courts.map((court) => (
                <Card
                  key={court.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle>{court.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{court.type}</p>
                    <p className="text-[18px] mb-6">Rs.{court.price} /hour</p>
                    <button
                      className={`w-full py-2 px-4 rounded-lg transition-colors ${
                        selectedDate && selectedTime
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      onClick={() => handleBooking(court)}
                      disabled={!selectedDate || !selectedTime}
                    >
                      Book Now
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Alert if date/time not selected */}
            {(!selectedDate || !selectedTime) && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertDescription>
                  Please select both date and time to proceed with booking
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && selectedCourt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Confirm Booking</CardTitle>
              <button
                onClick={() => setShowConfirmation(false)}
                className="p-2 bg-white hover:bg-black rounded-full hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-gray-600">Court</p>
                  <p className="font-medium">{selectedCourt.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">Date</p>
                  <p className="font-medium">{selectedDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">Time</p>
                  <p className="font-medium">{selectedTime}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">Price</p>
                  <p className="font-medium">Rs. {selectedCourt.price}</p>
                </div>
                <button
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    setShowConfirmation(false); // Handle booking confirmation here
                    onNavigate("payment");
                  }}
                >
                  Confirm Booking
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const PaymentPage = ({ onNavigate }: any) => {
  return (
    <>
      <div className="min-h-screen bg-[#0c1a25] flex">
        {/* Left Content */}
        <div className="w-2/3 flex flex-col justify-center items-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">
              Select Your Payment Method
            </h1>
            <p className="text-lg mb-4">
              Choose a method to proceed with your booking payment.
            </p>

            <div className="flex flex-col gap-4">
              <button
                className="bg-[#00f0ff] text-black px-6 py-3 rounded-lg font-semibold hover:bg-white"
                onClick={() => alert("Redirecting to Card Payment...")}
              >
                Pay with Credit/Debit Card
              </button>
              <button
                className="bg-[#00f0ff] text-black px-6 py-3 rounded-lg font-semibold hover:bg-white"
                onClick={() => alert("Redirecting to PayPal...")}
              >
                Pay with PayPal
              </button>
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600"
                onClick={() => onNavigate("booking")}
              >
                Go Back to Booking
              </button>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-2/3 h-screen realtive">
          <img src="/Images/b.jpg" 
          alt="futsal" 
          className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

// Main App Component with State-based Navigation
const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
      {currentPage === "contact" && <ContactPage onNavigate={handleNavigate} />}
      {currentPage === "booking" && <BookingPage onNavigate={handleNavigate} />}
      {currentPage === "payment" && <PaymentPage onNavigate={handleNavigate} />}
    </>
  );
};

export default App;
