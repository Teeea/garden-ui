<template>
  <div class="home">
    <header>
      <h1>花园</h1>
    </header>

    <section>
      <header><h2>根据书单获取记录</h2></header>
      <div>
        <header><h3>玄学推</h3></header>
        <ul>
          <li><router-link to="/book-list/32">ACG任意门</router-link></li>
          <li><router-link to="/book-list/33">青春の梦</router-link></li>
          <li><router-link to="/book-list/34">幻想的境界</router-link></li>
          <li><router-link to="/book-list/35">次元壁垒</router-link></li>
        </ul>
      </div>
    </section>

    <section>
      <header><h2>立刻收录周点击前3k的数据</h2></header>
      <ul>
        <li><a href="/record3k">收录</a></li>
      </ul>
    </section>

    <section><h2>任务设置</h2></section>
    <ul>
      <li><a href="/job">查看计划中的任务</a></li>
      <li><a href="/job-log">查看已结束的任务</a></li>
      <li><a href="/job/record3k?times=14400&gap=600000">刷新任务</a>(间隔10分，持续14400次)</li>
    </ul>
  </div>
</template>

<script>//
// @ is an alias to /src

export default {
  name      : 'Home',
  components: {},
};
</script>
