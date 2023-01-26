import { useState, createContext } from "react";

export const ModalContext = createContext({} as any);

const ModalContextProvider = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, handleOpenModal, handleCloseModal }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
