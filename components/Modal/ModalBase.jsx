import React from "react";
import {Modal, Slide} from "@mui/material";

export default function ModalBase({
                                    show,
                                    children,
                                    setShow,
                                    direction,
                                    stayOpen,
                                    onCloseCallback,
                                  }) {
  return (
    <Modal
      className="w-full lg:w-[430px] m-auto"
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      disableScrollLock={stayOpen}
      open={show}
      onClose={() => {
        if (!stayOpen) {
          setShow(false);
          onCloseCallback?.();
        }
      }}
    >
      <div className="w-full h-fit bg-root-backgroung">{children}</div>
    </Modal>
  );
}
