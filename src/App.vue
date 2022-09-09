<template>
  <div>
    数据
    <ul>
      <li v-for="item in userList" :key="item.id">
        {{ item.username }}
      </li>
    </ul>
  </div>
  <div>
    <button @click="getUserData">Click</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
interface IUser {
  id: number;
  username: string;
  password: string;
  role: string;
}
export default defineComponent({
  setup() {
    const userList = ref<Array<IUser>>([]);

    const getUserData = () => {
      axios
        .get("/api/data")
        .then((res) => {
          userList.value = res.data.data;
          console.log(res.data);
        })
        .catch((res) => {
          console.log("wrong"!);
        });
    };

    return {
      userList,
      getUserData,
    };
  },
});
</script>

<style scoped></style>
