import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditBookingsForm from "./EditBookingsForm";

export default function ChannelModel({ booking, hasClicked, setHasClicked }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="button">
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBookingsForm
            setShowModal={setShowModal}
            booking={booking}
            hasClicked={hasClicked}
            setHasClicked={setHasClicked}
          />
        </Modal>
      )}
    </>
  );
}
