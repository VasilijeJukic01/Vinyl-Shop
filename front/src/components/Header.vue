<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand" active-class="router-link-active">Vinyl Whirl</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/song" class="nav-link" active-class="router-link-active">Songs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" active-class="router-link-active">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>
