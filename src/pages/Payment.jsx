import React, { useEffect, useState } from 'react';
import "../style/payment.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/Authcontext';
import { ref, onValue } from "firebase/database";
import { database } from '../firebase-config/config';
import { Radio, RadioGroup, Button, Text, Image } from '@chakra-ui/react';
import { PopoverProfile } from '../components/Popover';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';

export const Payment = () => {
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // Controlled state for payment method

  const getUserData = (uid) => {
    const userRef = ref(database, "users/" + uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        console.error("No DATA Found");
      } else {
        const bookingName = data.data;

        setName(bookingName.booking.name);
        setTime(bookingName.time);
      }
    });
  };

  useEffect(() => {
    if (user) {
      getUserData(user.uid);
    }
  }, [user]);

  const Overlay = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div id='paymentContainer'>
      <div id="paymentNav">
        <Link to={"/turf"}>
          <IoMdArrowRoundBack fontWeight={"bold"} fontSize="30px" />
        </Link>
        <p id='BookedTurfName'>{name}</p>
        <PopoverProfile email={user.email} />
      </div>
      <div id='paymentContainerBox'>
        <div id='paymentMode'>
          <Text fontWeight={"bold"} fontSize="25px">Pay Now</Text>
          <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
            <Radio value="QR">Pay with QR</Radio>
            <Radio value="Cash">Pay with Cash</Radio>
          </RadioGroup>
          {paymentMethod === "QR" && (
            <div id='qrCodeSample'>
              <Text mt={4} fontSize="md">Scan the QR code below to pay:</Text>
              <Image src="C:\Users\niranjan\OneDrive\Desktop\GameOn\src\images\QRcode.jpg" alt=" QR Code" boxSize="150px" mt={2} />
            </div>
          )}
          <Button
            onClick={onOpen}
            colorScheme="red"
            isDisabled={!paymentMethod} // Disable the button until a payment method is selected
          >
            Confirm Payment
          </Button>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <Overlay />
            <ModalContent>
              <ModalHeader>Order Booked</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Thanks for booking {name}</Text>
                <Text>Time: {time}</Text>
                <Text>Payment Method: {paymentMethod}</Text>
              </ModalBody>
              <ModalFooter>
                <Link to="/turf">
                  <Button onClick={onClose}>Close</Button>
                </Link>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};
