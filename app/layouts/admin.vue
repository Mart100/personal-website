<script lang="ts" setup>
const password = ref('');
const isLoggedIn = ref(false);

async function login() {
  const response = await $fetch('/api/admin/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: { password: password.value }
  })

  if (response.success) {
    isLoggedIn.value = true
  } else {
    alert('Incorrect password')
  }
}
</script>


<template>
  <div class="admin">
    <form @submit.prevent="login" class="login" v-if="!isLoggedIn">
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <div class="loggedin admin-layout" v-else>
      <AdminSidebar />
      <div class="admin-content">
        <slot />
      </div>
    </div>

  </div>
</template>



<style scoped lang="scss">
.admin-layout {
  display: flex;
}

.admin-content {
  flex-grow: 1;
  height: 100vh;
  overflow-y: auto;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  input {
    padding: 10px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #555;
    }
  }
}

.loggedin {
  .projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1400px;
    margin: auto;
    height: 100vh;
    overflow-y: auto;
  }
}
</style>