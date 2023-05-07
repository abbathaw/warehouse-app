import Modal from 'react-modal';
import React from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--bg-color)',
  },
};

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

interface IModal {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  children: React.ReactNode;
  title: string;
}
const ModalContainer = ({ isModalOpen, setIsModalOpen, children, title }: IModal) => {
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles} contentLabel={title}>
      <h2>{title}</h2>
      {children}
    </Modal>
  );
};

export default ModalContainer;
