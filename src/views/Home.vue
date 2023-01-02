<template>
  <div>
    <v-form @submit.prevent="submitform" style="width: 100%; max-width: 500px">
      <v-text-field
        v-model="state.formdata.marka"
        label="Marka"
        required
      ></v-text-field>
      <v-text-field
        v-model="state.formdata.model"
        label="Model"
        required
      ></v-text-field>
      <v-text-field
        v-model="state.formdata.komponente"
        label="Komponente"
        required
      ></v-text-field>
      <v-btn type="submit"> Submit </v-btn>
      <v-btn type="reset" @click="onReset"> Reset </v-btn>
    </v-form>
    <div
      v-if="state.listaLaptopa.length > 0"
      style="width: 100%; max-width: 500px"
    >
      <v-container class="mx-4">
        <v-card v-for="laptop in state.listaLaptopa" :key="laptop.id">
          <v-container grid-list-md>
            <v-list> Marka: {{ laptop.marka }} </v-list>
            <v-divider></v-divider>
            <v-list> Model: {{ laptop.model }} </v-list>
            <v-divider></v-divider>
            <v-list> Komponente: {{ laptop.komponente }} </v-list>
            <v-divider></v-divider>
            <v-btn type="delete" @click="deleteLaptope(laptop.id)">
              Delete
            </v-btn>
            <v-btn color="primary" @click="setEdit(laptop)">Edit</v-btn>
          </v-container>
        </v-card>
      </v-container>

      <div class="text-center">
        <v-dialog v-model="state.edit" id="edit">
          <v-card>
            <v-text-field
              type="double"
              v-model="state.editLaptopaPodaci.marka"
              label="Marka"
            ></v-text-field>
            <v-text-field
              type="double"
              v-model="state.editLaptopaPodaci.model"
              label="Model"
            ></v-text-field>
            <v-text-field
              type="double"
              v-model="state.editLaptopaPodaci.komponente"
              label="Komponente"
            ></v-text-field>
            <v-btn
              color="primary"
              block
              @click="
                editForm();
                state.edit = false;
              "
              >Spremi</v-btn
            >
            <v-btn color="primary" @click="state.edit = false">Zatvori</v-btn>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";

export default {
  name: "laptopInfo",
  setup() {
    const state = reactive({
      formdata: {
        marka: "",
        model: "",
        komponente: "",
      },
      poruka: "",
      listaLaptopa: [],
      edit: false,
      editLaptopaPodaci: null,
    });

    async function submitform() {
      await addDoc(collection(db, "laptop"), {
        marka: state.formdata.marka,
        model: state.formdata.model,
        komponente: state.formdata.komponente,
      });
      state.formdata.marka = " ";
      state.formdata.model = " ";
      state.formdata.komponente = " ";
    }
    const editForm = async () => {
      await updateDoc(doc(db, "laptop", state.editLaptopaPodaci.id), {
        marka: state.editLaptopaPodaci.marka,
        model: state.editLaptopaPodaci.model,
        komponente: state.editLaptopaPodaci.komponente,
      });
    };

    let unsubscribe;

    const dohvatiLaptope = async () => {
      const q = query(collection(db, "laptop"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        state.listaLaptopa = [];
        querySnapshot.forEach((doc) => {
          let laptop = {
            id: doc.id,
            marka: doc.data().marka,
            model: doc.data().model,
            komponente: doc.data().komponente,
          };

          state.listaLaptopa.push(laptop);
        });
      });
    };

    const deleteLaptope = async (id) => {
      await deleteDoc(doc(db, "laptop", id));
    };
    const setEdit = (laptop) => {
      state.edit = true;
      state.editLaptopaPodaci = {
        id: laptop.id,
        marka: laptop.marka,
        model: laptop.model,
        komponente: laptop.komponente,
      };
    };
    onMounted(() => {
      dohvatiLaptope();
    });

    const onReset = () => {
      state.formdata.marka = " ";
      state.formdata.model = " ";
      state.formdata.komponente = " ";
    };

    return {
      submitform,
      onReset,
      state,
      deleteLaptope,
      editForm,
      setEdit,
    };
  },
};
</script>
