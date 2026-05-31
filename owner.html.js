
import { auth, db, storage } from "./firebase-config.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("ownerForm");
  console.log("SUBMIT BUTTON CLICKED");

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData(form);

      const imageFile = formData.get("image");

      if (!imageFile || imageFile.size === 0) {
        alert("Please select property image");
        return;
      }

      // Upload image to Firebase Storage
      const imageRef = ref(
        storage,
        "propertyImages/" +
        Date.now() +
        "_" +
        imageFile.name
      );

      await uploadBytes(imageRef, imageFile);

      const imageUrl =
        await getDownloadURL(imageRef);

      // Save property data
      await addDoc(collection(db, "properties"), {

        ownerName: formData.get("name"),

        email: formData.get("email"),

        phone: formData.get("phone"),

        city: formData.get("city"),

        area: formData.get("area"),

        location: formData.get("location"),

        propertyType:
          formData.get("propertyType"),

        price:
          Number(formData.get("price")),

        furnished:
          formData.get("furnished"),

        availableFrom:
          formData.get("availableFrom"),

        imageUrl: imageUrl,

        ownerId:
          auth.currentUser?.uid || null,

        createdAt:
          new Date()

      });

      alert("🎉 Property Added Successfully");

      form.reset();

      location.reload();

    } catch (error) {

      console.error(error);

      alert("Error: " + error.message);

    }

  });

});