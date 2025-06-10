---
layout: default
---

# <span id="home">Hello, World!</span>

Thank you for stopping by and welcome to my personal site! It's constantly under construction, so please excuse the mess.

If you have some time, enjoy some pictures of myself, my partner, our dog Momo, and our cat Appa. ☺️


<div class="carousel">
  <div class="carousel-images">
    {% assign carousel_images = site.static_files | where_exp: "file", "file.path contains 'assets/images/carousel/'" %}
    {% assign shuffled = carousel_images | sample: carousel_images.size %}
    {% for image in shuffled %}
      <img src="{{ image.path }}" alt="About image" class="carousel-img{% if forloop.first %} active{% endif %}">
    {% endfor %}
  </div>
</div>

## <span id="about">About</span>

I'm a software engineer based in Austin, TX who enjoys learning new technologies and upskilling. I pride myself on being adaptable and a jack-of-all-trades, always eager to take on new challenges and grow throughout my career.

Over the years, I've been at companies of diferrent shapes and sizes. My experience spans being a technical leader, managing cloud infrastructure, and working on everything from developer platforms to large-scale data pipelines. I'm comfortable with Python, JavaScript/TypeScript, Terraform, Kubernetes, and a wide range of DevOps and data engineering tools. I love collaborating across teams, mentoring others, and making sure systems are reliable, scalable, and secure.

Outside of work, I enjoy tackling side projects that solve problems or scratch a personal itch. One of my favorites is the OPTCG Top 8 Generator, a tool for the One Piece Trading Card Game community that helps create visually appealing tournament results.

When I'm not coding, you might find me volunteering, playing disc golf, basketball, or tennis, or getting into a good board/card/video game. I also love reading, crocheting, collecting pins, and exploring new places and adventuring.

## <span id="projects">Projects</span>

<div class="project-cards">
  <a href="https://optcg.top" target="_blank" class="project-card">
    <div class="project-card-image">
      <img src="https://optcg.top/static/images/example.png" alt="https://optcg.top">
    </div>
    <div class="project-card-content">
      <h3>OPTCG Top 8 Generator</h3>
      <p>An image generation tool for the One Piece Trading Card Game to create visually appealing tournament results with clear and concise information! Created as a passion project for one of my favorite hobbies and being unsatisfied with the current offerings (or lack thereof).</p>
      <p>Built with Python and JavaScript. Image generation done with Python Imaging Library (PIL), object detection and image parsing with Python-tesseract (Tesseract-OCR), automatic leader scraping with BeautifulSoup, jQuery and Bootstrap for simplicity and consistent UI/UX, and deployed with Kubernetes on Google Cloud.</p>
    </div>
  </a>

  <a href="https://github.com/huystuhh/watermarknt" target="_blank" class="project-card">
    <div class="project-card-image">
      <img src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3NodXR0ZXJzdG9jay0yMjU5MDc0MDQ5LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fX19">
    </div>
    <div class="project-card-content">
      <h3>Watermarkn't</h3>
      <p>A simple Python application to remove watermark text from an image. I developed this as a side project for my own personal use case (related to the OPTCG Top 8 Generator above) and not for financial or commercial use.</p>
      <p>It currently uses OpenCV and inpainting to naively try and remove the watermark and unfortunately does not do it very well. The most successful watermark removal tools use AI/ML to re-draw the image after the watermark has been removed, which is my future goal for improving this application.</p>
      <p>Note: banner image for this project card is from Shutterstock.</p>
    </div>
  </a>

  <a href="https://huydngo.dev" target="_blank" class="project-card">
    <div class="project-card-image">
      <img src="https://www.watchmojo.com/uploads/thumbs720/Fi-M-Top10-The-Lord-of-the-Rings-Characters_R1L2K1-1080p30.jpg" alt="https://huydngo.dev">
    </div>
    <div class="project-card-content">
      <h3>Destroying the One Ring</h3>
      <p>The world is changed. I feel it in the water. I feel it in the earth. I smell it in the air. Much that once was is lost, for none now live who remember it. It began with the forging of the Great Rings. Three were given to the Elves, immortal, wisest and fairest of all beings. Seven to the Dwarf lords, great miners and craftsmen of the mountain halls. And nine, nine rings were gifted to the race of Men, who, above all else, desire power. But they were, all of them, deceived, for another ring was made. In the land of Mordor, in the fires of Mount Doom, the Dark Lord Sauron forged in secret a Master Ring, to control all others. And into this ring he poured his cruelty, his malice and his will to dominate all life. One Ring to rule them all!</p>
    </div>
  </a>
</div>

## <span id="resume">Resume</span>

Thanks for checking out my resume! 🙇🏻‍♂️

<embed id="resume-embed" src="/assets/files/Huy Ngo - Resume.pdf" type="application/pdf">

<a href="/assets/files/Huy Ngo - Resume.pdf" target="_blank">Huy Ngo - Resume.pdf</a>
