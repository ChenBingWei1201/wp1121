import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_USER_PROFILE_MUTATION } from "../../graphql";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
const EditProfilePage = () => {
  const navigate = useNavigate();
  const handleNotMe = () => {
    navigate("/*");
  };
  const { userid } = useParams();
  const { user } = useContext(UserContext);
  // if (!userid) handleNotMe();
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [studentID, setStudentID] = useState("");
  const [photoLink, setPhotoLink] = useState("");

  const [updateUser, { loading, error }] = useMutation(
    UPDATE_USER_PROFILE_MUTATION,
  );

  const handleUpdate = async () => {
    if (!userid || !name || !studentID || !photoLink || !introduction) {
      alert("please input all columns");
      return;
    }
    if (loading) return "Submitting...";
    if (error) return `Submission error! ${error.message}`;

    await updateUser({
      variables: {
        updateUserProfileId: parseInt(userid),
        userProfileInput: {
          name: name,
          introduction: introduction,
          photoLink: photoLink,
          studentID: studentID,
        },
      },
    });
    navigate(`/user/${userid}`);
  };

  return (
    <>
      {user ? (
        <div className="flex rounded bg-white mt-5 mb-5 justify-center">
          <div className="flex flex-row w-fit">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <button
                  className="text-md font-bold bg-blue-700 mt-0 text-white px-4 py-1 rounded hover:bg-blue-700 mr-2 "
                  onClick={() => handleUpdate()}
                >
                  save
                </button>
                <div className="flex mt-2">
                  <span className="bg-slate-400 p-1 px-4 rounded text-white center">
                    Name
                  </span>
                </div>
                <input
                  className="p-1 px-4 rounded"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  placeholder="write here"
                />

                <div className="flex flex-row space-x-2">
                  <span className="bg-slate-400 p-1 px-4 rounded text-white center">
                    Introduction
                  </span>
                </div>
                <textarea
                  value={introduction}
                  placeholder="write here"
                  onChange={(event) => {
                    setIntroduction(event.target.value);
                  }}
                ></textarea>
                <div className="flex mt-2">
                  <span className="bg-slate-400 p-1 px-4 rounded text-white center">
                    StudentId
                  </span>
                </div>
                <input
                  className="p-1 px-4 rounded"
                  type="text"
                  id="photoLink"
                  value={studentID}
                  onChange={(event) => {
                    setStudentID(event.target.value);
                  }}
                  placeholder="write here"
                />

                <div className="flex mt-2">
                  <span className="bg-slate-400 p-1 px-4 rounded text-white center">
                    PhotoLink
                  </span>
                </div>
                <input
                  className="p-1 px-4 rounded"
                  type="text"
                  id="photoLink"
                  value={photoLink}
                  onChange={(event) => {
                    setPhotoLink(event.target.value);
                  }}
                  placeholder="write here"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>{handleNotMe}</>
      )}
    </>
  );
};

export default EditProfilePage;
