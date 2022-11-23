import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import DatePicker from "react-datepicker";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";

import { Card, Input, Button, Loader } from "../../components";
import { getDataById, createData, updateData } from "../../api";
import { formatDate } from "../../utils";

import "./AddTodo.style.less";
import "react-datepicker/dist/react-datepicker.css";

/**
 * AddTodo Page
 * @returns AddTodo as Component
 */
const AddTodo = () => {
  const navigate = useNavigate(); // Initializing hook for routing
  const { id } = useParams(); // Task id
  const isEdit = Boolean(id); // Checking if a task is being edited

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const [fileLoading, setFileLoading] = useState(false); // File loading status
  const [isLoading, setIsLoading] = useState(false); // Loading page status
  const [startDate, setStartDate] = useState(null); // Start date and time

  const inputFileRef = useRef(null); // ref for input type="file"

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onChangeDate = (date) => {
    setStartDate(date);
  };

  const onClearDate = () => {
    setStartDate(null);
  };

  // Function for upload data into firebase storage
  const onFileChange = (e) => {
    setFileLoading(true);
    const file = e.target.files[0];
    const fileRef = ref(storage, `/files/${file.name}`);
    uploadBytes(fileRef, file).then(() => {
      getDownloadURL(fileRef, file).then((url) => {
        setFileUrl(url);
        setFileName(file.name);
        setFileLoading(false);
      });
    });
  };

  // Delete file from firebase storage
  const onClearFile = async () => {
    const fileRef = ref(storage, `/files/${fileName}`);
    await deleteObject(fileRef).then(() => {
      setFileUrl("");
      setFileName("");
    });
  };

  // Create / Update function, that trigger firebase changes
  const onSubmit = (e) => {
    e.preventDefault();
    const fields = {
      title,
      text,
      fileUrl,
      fileName,
      expiration: startDate,
    };
    if (!title) {
      return alert("Title cannot be empty");
    }
    isEdit ? updateData(id, fields) : createData(fields);
    navigate("/");
  };

  // Checking if a task is being modified or created
  useEffect(() => {
    if (isEdit) {
      setIsLoading(true);
      getDataById(id).then((data) => {
        setTitle(data.title);
        setText(data.text);
        setFileName(data.fileName);
        setFileUrl(data.fileUrl);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Card>
      <Link to="/">
        <ImCross className="card__close" />
      </Link>
      <Input
        value={title}
        onChange={onChangeTitle}
        placeholder={isLoading ? "Loading" : "Title"}
      />
      <Input
        value={text}
        onChange={onChangeText}
        placeholder={isLoading ? "Loading" : "Text"}
      />
      <Button onClick={() => inputFileRef.current.click()}>Add file</Button>
      <div className="loading-status">
        {fileLoading && <Loader />}
        {fileName && (
          <>
            <span className="loading-status__info">Added file: {fileName}</span>
            <Button onClick={onClearFile}>Delete file</Button>
          </>
        )}
      </div>

      <Button onClick={onSubmit}>Add Todo</Button>
      <div className="date-picker">
        <DatePicker
          selected={startDate}
          minDate={new Date()}
          showTimeInput
          focusSelectedMonth={true}
          onChange={onChangeDate}
          inline
        />

        {startDate && (
          <div className="date-picker__toggles">
            <span>{formatDate(startDate)}</span>
            <Button onClick={onClearDate}>Clear Date</Button>
          </div>
        )}
      </div>
      <input
        onClick={(e) => (e.target.value = null)}
        type="file"
        ref={inputFileRef}
        onChange={onFileChange}
        hidden
      />
    </Card>
  );
};

export default AddTodo;
