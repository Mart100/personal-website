<script lang="ts" setup>

useHead({
  title: 'Mart van Enckevort',
  meta: [
    { name: 'description', content: 'Portfolio of Mart van Enckevort, where you can find my latest programming projects.' }
  ]
})
</script>

<template>
  <Background></Background>
  <TheHeader></TheHeader>
  <h1>Mart van Enckevort's Portfolio</h1>
  <p class="subtext">
    👋 Hi, I'm Mart van Enckevort, a student from the Netherlands<br>
    This is my site where you can find all of my projects
  </p>

  <Projects></Projects>
  <Skills></Skills>
  <Socials></Socials>
  <br><br><br>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  background-color:rgb(30, 32, 35);
  font-family: Poppins;
  margin: 0px;

  #__nuxt {
    position: relative;
    
    > h1 {
      font-size: 7vw;
      font-weight: 100;
      margin: auto;
      text-align: center;
      color: white;
    }

    > .subtext {
      font-size: 1.2vw;
      font-weight: 500;
      margin: auto;
      text-align: center;
      color: white;
    }

    > h2 {
      font-size: 5vw;
      font-weight: 100;
      margin: auto;
      margin-top: 20vh;
      text-align: center;
      color: white;
    }
  }

}

@media only screen and (max-width: 768px) {
  
  body #__nuxt {
    > h1, > h2 {
      font-size: 8vw;
    }

    >.subtext {
      font-size: 2vw;
    }
  }

}
</style>