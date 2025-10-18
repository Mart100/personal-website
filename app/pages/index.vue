<script lang="ts" setup>

const projects = await fetchProjects()

useHead({
  title: 'Mart van Enckevort',
  meta: [
    { name: 'description', content: 'Portfolio of Mart van Enckevort, where you can find my latest programming projects.' }
  ]
});

const featured1 = projects.value.find(project => project.title === 'Learning The Useless')!
const featured2 = projects.value.find(project => project.title === 'Toorney')!
</script>

<template>
  <div id="homepage">
    <Background></Background>
    <TheHeader></TheHeader>
    <h1 class="name">Mart van Enckevort</h1>
    <p class="subtext">
      👋 Hi, I'm Mart, a 21-year-old software engineer from the Netherlands<br>
      Welcome to my personal site, showcasing a portfolio of my projects.
    </p>
    <!-- <h2 class="homepage">Featured Projects</h2>
    <div class="featureds">
      <FeaturedProject :project="featured1"></FeaturedProject>
      <FeaturedProject :project="featured2"></FeaturedProject>
    </div> -->
    <Projects></Projects>
    <Skills></Skills>
    <Socials></Socials>
    <br><br><br>
  </div>
</template>

<style lang="scss" scoped>
.featureds {
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: auto;
  flex-wrap: wrap;
}

.name {
  font-size: 5em;
  font-weight: 100;
  margin: auto;
  text-align: center;
  color: white;
}

.subtext {
  font-size: 1.2em;
  font-weight: 500;
  margin: auto;
  text-align: center;
  color: white;
}


@media only screen and (max-width: 768px) {

  .name {
    font-size: 8vw;
  }

  .subtext {
    font-size: 2vw;
  }
}
</style>
