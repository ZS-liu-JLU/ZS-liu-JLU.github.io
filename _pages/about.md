---
layout: academic
permalink: /
title: "Zhishu Liu"
excerpt: "Micro-expression recognition, action unit detection, and multimodal large models for affective computing."
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<section class="hero" id="about-me" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="eyebrow">Hello! I'm</p>
    <h1 class="hero-title" id="hero-title">Zhishu <span>Liu<span aria-hidden="true">.</span></span></h1>
    <p class="hero-subtitle">Small expressions.<br>Interesting questions.</p>
    <p class="hero-description">I study micro-expressions and facial action units, with an interest in multimodal large models for affective computing.</p>
    <div class="hero-actions">
      <a class="button button-primary" href="#publications">Explore my research</a>
      <a class="button button-secondary" href="{{ site.author.googlescholar | escape }}" target="_blank" rel="noopener noreferrer">Google Scholar</a>
    </div>
    <div class="research-tags" aria-label="Research interests"><span class="tag">Micro-expressions</span><span class="tag">Action units</span><span class="tag">Multimodal models</span></div>
  </div>
  <div class="hero-art">
    <span class="spark spark-one" aria-hidden="true">✦</span><span class="spark spark-two" aria-hidden="true">✧</span>
    <span class="hero-sticker sticker-one" aria-hidden="true">Hello, world!</span>
    <div class="art-frame"><img class="hero-illustration" src="{{ '/images/theme/pikachu-profile.jpg' | relative_url }}" alt="My Pikachu avatar in a sunny forest" width="460" height="460" fetchpriority="high" decoding="async"><span class="art-label" aria-hidden="true">A little curiosity, every day.</span></div>
    <span class="hero-sticker sticker-two" aria-hidden="true">Keep exploring!</span>
  </div>
</section>

<div class="profile-grid" role="group" aria-label="Academic background">
  <div class="profile-strip">
    <img class="profile-avatar" src="{{ site.author.avatar | relative_url }}" alt="Portrait of Zhishu Liu" width="64" height="64" decoding="async">
    <div class="profile-details"><span class="profile-name">MSc Student · Computer Science</span><span class="profile-affiliation">City University of Hong Kong (Dongguan) · Visiting student at Great Bay University</span></div>
  </div>
  <div class="profile-strip profile-strip-undergraduate">
    <span class="profile-school-badge" aria-hidden="true">JLU</span>
    <div class="profile-details"><span class="profile-name">Bachelor’s degree · Artificial Intelligence</span><span class="profile-affiliation">College of Artificial Intelligence · Jilin University</span><span class="profile-meta">2021.09 – 2025.06 · Advised by Prof. Tieru Wu</span></div>
  </div>
</div>

<section class="content-section" id="about" aria-labelledby="about-title">
  <header class="section-header"><span class="section-number" aria-hidden="true">01</span><div><p class="section-eyebrow">A little about me</p><h2 class="section-title" id="about-title">Research &amp; curiosity</h2></div></header>
  <div class="about-grid">
    <div class="about-copy">
      <p>I am Zhishu Liu, currently an MSc student in Computer Science at <strong>City University of Hong Kong (Dongguan)</strong>. I received my bachelor's degree from the College of Artificial Intelligence, <strong>Jilin University</strong>, advised by <strong>Prof. Tieru Wu</strong>, and I am also a visiting student at <strong>Great Bay University</strong> under the supervision of <strong>Prof. Zitong Yu</strong>.</p>
      <p>My research focuses on micro-expression recognition, micro-AU recognition, and multimodal large models for affective computing. I hope to pursue research that is both interesting and meaningful.</p>
      <p>I have also served as a reviewer for <em>Pattern Recognition</em>.</p>
    </div>
    <aside class="research-card" aria-label="Research interests"><span aria-hidden="true">✦</span><h3 class="research-card-title">Things I explore</h3><ul class="interest-list"><li>Micro-expression recognition</li><li>Micro-AU detection</li><li>Multimodal affective computing</li></ul></aside>
  </div>
  <span class="legacy-anchor" id="-news" aria-hidden="true"></span>
  <div class="news-card" id="news" aria-label="Latest news"><span class="news-date">2025.06 · News</span><p class="news-copy">Our paper “AULLM” was accepted by <strong>CCBR 2025</strong> (The 19th Chinese Conference on Biometric Recognition), with an <strong>oral presentation</strong>.</p></div>
</section>

<span class="legacy-anchor" id="-publications" aria-hidden="true"></span>
<section class="content-section" id="publications" aria-labelledby="publications-title">
  <header class="section-header"><span class="section-number" aria-hidden="true">02</span><div><p class="section-eyebrow">First-author work</p><h2 class="section-title" id="publications-title">First-author publications</h2></div></header>
  <div class="publication-list">{% for paper in site.data.publications.first_author %}{% include publication-card.html %}{% endfor %}</div>
</section>

<section class="content-section" id="collaborations" aria-labelledby="collaborations-title">
  <header class="section-header"><span class="section-number" aria-hidden="true">03</span><div><p class="section-eyebrow">Non-first-author work</p><h2 class="section-title" id="collaborations-title">Collaborative publications</h2></div></header>
  {% if site.data.publications.collaborations.size > 0 %}
  <div class="publication-list">{% for paper in site.data.publications.collaborations %}{% include publication-card.html %}{% endfor %}</div>
  {% else %}
  <div class="collaboration-placeholder"><span class="collaboration-graphic" aria-hidden="true">✦ &amp; ✦</span><div class="collaboration-copy"><h3>Research is a team adventure.</h3><p>Co-authored publication details will be added here.</p></div></div>
  {% endif %}
</section>

<section class="content-section" id="journey" aria-labelledby="journey-title">
  <header class="section-header"><span class="section-number" aria-hidden="true">04</span><div><p class="section-eyebrow">Along the way</p><h2 class="section-title" id="journey-title">Education &amp; milestones</h2></div></header>
  <div class="journey-grid">
    <div>
      <span class="legacy-anchor" id="-educations" aria-hidden="true"></span>
      <h3 class="subsection-title" id="education">Education</h3>
      <ol class="timeline">
        <li class="timeline-item"><span class="timeline-date">2025.09 – 2027.06 (Expected)</span><h4 class="timeline-title">City University of Hong Kong (Dongguan)</h4><p class="timeline-description">Master in Computer Science</p></li>
        <li class="timeline-item"><span class="timeline-date">2025.05 – 2027.08 (Expected)</span><h4 class="timeline-title">Great Bay University</h4><p class="timeline-description">Visiting Student · YU Vision Group</p></li>
        <li class="timeline-item"><span class="timeline-date">2021.09 – 2025.06</span><h4 class="timeline-title">Jilin University</h4><p class="timeline-description">Bachelor in Artificial Intelligence</p></li>
      </ol>
    </div>
    <div>
      <span class="legacy-anchor" id="-honors-and-awards" aria-hidden="true"></span>
      <h3 class="subsection-title" id="awards">Honors &amp; awards</h3>
      <ul class="award-list">
        <li class="award-item"><span class="award-year">2025</span><span class="award-text">CCF Dongguan Student Member Service Appreciation Award</span></li>
        <li class="award-item"><span class="award-year">2025</span><span class="award-text">Jilin University Outstanding Student Leader Award</span></li>
        <li class="award-item"><span class="award-year">2025</span><span class="award-text">Jilin University Third-Class Scholarship</span></li>
        <li class="award-item"><span class="award-year">2024</span><span class="award-text">Outstanding Communist Youth League Cadre of Jilin University</span></li>
        <li class="award-item"><span class="award-year">2023</span><span class="award-text">Second Prize · National Undergraduate Mathematical Modeling Competition</span></li>
        <li class="award-item"><span class="award-year">2023</span><span class="award-text">Jilin University “Dongrong” Social Scholarship (Korea IB Group)</span></li>
      </ul>
    </div>
  </div>
</section>

{% include visitor-map.html %}

<section class="content-section" id="contact" aria-labelledby="contact-title">
  <div class="contact-card">
    <div class="contact-copy"><p class="section-eyebrow">Say hello</p><h2 class="section-title" id="contact-title">Let's connect.</h2><p>Find my research, code, or get in touch.</p></div>
    <div class="contact-links"><a class="button button-primary" href="mailto:{{ site.author.email | escape }}">Email</a><a class="button button-secondary" href="https://github.com/{{ site.author.github | escape }}" target="_blank" rel="noopener noreferrer">GitHub</a><a class="button button-secondary" href="{{ site.author.googlescholar | escape }}" target="_blank" rel="noopener noreferrer">Google Scholar</a></div>
  </div>
</section>
