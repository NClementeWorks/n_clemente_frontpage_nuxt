<template>
  <main>
    <ContentList path="/use_cases" v-slot="{ list }">
      <div v-for="article in list" :key="article._path" style="border: thin solid gray; padding: 1rem; margin: 1rem; border-radius: 1rem">
        <h2>
          <NuxtLink
            :to="article._path">
            {{ article.title }}
          </NuxtLink>
        </h2>
        <p>{{ article.description }}</p>
      </div>
    </ContentList>
  </main>
</template>