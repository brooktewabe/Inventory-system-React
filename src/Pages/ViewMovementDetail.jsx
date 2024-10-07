import { useState, useEffect } from "react";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";

const ViewMovementDetail = () => {
  const { id } = useParams();
  const [movement, setMovement] = useState(null);
  const navigate = useNavigate();
  const handleReturn = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  useEffect(() => {
    const fetchMovement= async () => {
      try {
        const response = await axios.get(`https://api.akbsproduction.com/movement/${id}`);
        setMovement(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchMovement();
  }, [id]);

  if (!movement) return <p>Loading...</p>;

  return (
    <section className="bg-[#edf0f0b9] h-screen">
      <div className="container m-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* First small full-width grid */}
          <div className="bg-white p-4">
            <h3 className="text-xl font-bold">Stock Movement - Details</h3>
          </div>

          {/* full-width grid */}
          <div className="bg-white p-6 rounded-lg shadow-md ml-40 max-w-2xl">
            <div className="ml-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Stock Movement | {movement.Type}{" "}</h3>
              <hr className="mb-4" />

                <div className="flex items-center">
                  <strong className="w-40">Author:</strong>
                  <span className="text-[#8f8d8d]">{movement.User}</span>
                </div>
                <div className="flex items-center">
                  <strong className="w-40">Change Mode:</strong>
                  <span className="text-[#8f8d8d]">{movement.Type}</span>
                </div>
                <div className="flex items-center">
                  <strong className="w-40">Date:</strong>
                  <span className="text-[#8f8d8d]">{movement.Date}</span>
                </div>
                {/* <div className="flex items-center">
                  <strong className="w-40">Reason:</strong>
                  <span className="text-[#8f8d8d]">{movement.Reason}</span>
                </div> */}
              </div>
              <br />
              <br />
              <hr />
              <br />
              <button
                onClick={handleReturn}
                className="bg-[#16033a] ml-40  text-white px-16 py-2 rounded-lg"
              >
                Done
              </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ViewMovementDetail };
export default withAuth(ViewMovementDetail);
