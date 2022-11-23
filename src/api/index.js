import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";
const dataCollectionRef = collection(db, "todos"); // Collection of todos

/**
 * Fetch array of todo
 * @param {function} setData - Takes as a parameter of the setState function from the useState tuple
 * @param {boolean} setIsLoading - Change loading status on fetch
 * @returns {Array} collection from DB
 */
export const getData = async (setData, setIsLoading) => {
  setIsLoading(true);
  const getQuery = query(dataCollectionRef, orderBy("timestamp"));
  const unsubscribe = onSnapshot(getQuery, (querySnapshot) => {
    const dataArr = [];
    querySnapshot.forEach((_doc) => {
      return dataArr.push({ ..._doc.data(), id: _doc.id });
    });
    setData(dataArr);
    setIsLoading(false);
  });
  return () => unsubscribe();
};

/**
 * Getting instance by ID
 * @param {string} id  - id of document in collection
 * @returns {object} Instance with corresponding id
 */
export const getDataById = async (id) => {
  const snapshot = await getDoc(doc(dataCollectionRef, id));
  if (snapshot.exists()) {
    return snapshot.data();
  }
  return null;
};

/**
 * Creates new data and puts it into the DB
 * @param {object} form Form with required fields
 * @param {string} form.title - Title of data
 * @param {string} form.text - Text of data
 * @param {string} form.fileUrl - File URL of data
 * @param {string} form.fileName - file name of data
 * @param {number} form.expiration - Expiration of data in seconds
 * @param {boolean} form.checked - Completion status
 */
export const createData = async (form) => {
  await addDoc(dataCollectionRef, {
    title: form.title,
    text: form.text,
    fileUrl: form.fileUrl,
    fileName: form.fileName,
    timestamp: Date.now(),
    expiration: form.expiration,
    checked: false,
  });
};

/**
 * Updates new data and puts it into the DB
 * @param {string} id ID of document in collection
 * @param {object} form Form with required fields
 * @param {string} form.title - Title of data
 * @param {string} form.text - Text of data
 * @param {string} form.fileUrl - Public file URL of data
 * @param {string} form.fileName - Public file name of data
 * @param {number} form.expiration - Expiration of data in seconds
 */
export const updateData = async (id, form) => {
  await updateDoc(doc(dataCollectionRef, id), {
    title: form.title,
    text: form.text,
    fileUrl: form.fileUrl,
    fileName: form.fileName,
    expiration: form.expiration,
  });
};

/**
 * Update status the completion status of the taskF
 * @param {object} data Instance of collection
 * @param {string} data.id ID of instance
 */
export const updateStatus = async (data) => {
  await updateDoc(doc(dataCollectionRef, data.id), {
    checked: !data.checked,
  });
};

/**
 * Delete data from DB by id
 * @param {string} id ID of instance
 */
export const deleteData = async (id) => {
  await deleteDoc(doc(dataCollectionRef, id));
};
