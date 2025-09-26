---
title: "Diffusion Seminar"
date: "2025-07-25"
summary: "07/2025 – 09/2025 | Summer 2025 Diffusion Tutorial"
thumbnail: "seminar/thumbnails/diffusion_seminar.png"
---

# Curriculum

## 1. Diffusion Theory
1. Generative Modeling (What is generative model?)
2. Stochastic differential equation
3. Score matching (+flow matching)
4. Diffusion formulation

## 2. Diffusion techniques
1. Sampling (DDPM, DDIM..)
2. Conditioning, Guidance
3. Noise scheduling
4. Efficiency (distill, consistency..)

## 3. Diffusion language model
1. Continuous diffusion (Embedding, Latent)
2. Discrete diffusion (mdlm, score matching)
3. AR VS. NAR
4. Scaling

&nbsp;
&nbsp;

# Contents
## Week 1: Introduction to Diffusion Model

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;"> 
  <iframe 
    src="https://www.youtube.com/embed/dQs8gQJ5rxI?si=_gdCF5Q2nLw"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

This seminar video is the introduction to the Diffusion Seminar series. This session introduces the foundational concepts of generative modeling, with a focus on the basics of diffusion models. We then explore how these models extend to language, highlighting recent developments in diffusion language models. Finally, we outline future directions and research opportunities covered in the full seminar series.

Presenter: Woojin Kim

&nbsp;

##	Week 2: Generative Modeling I 
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;"> 
  <iframe 
    src="https://www.youtube.com/embed/Hg7gXjfUGmI?si=EUiEFaxSYZhGJE-n"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

This seminar video is the second week's session of the Diffusion Seminar series. In this session, we cover the definition and taxonomy of generative modeling, and provide an overview of three major categories derived from this taxonomy: autoregressive modeling, variational autoencoders (VAE), and generative adversarial networks (GANs).

Presenter: Jihwan Hong
 
&nbsp;

## Week 3: Generative Modeling Ⅱ

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;"> 
  <iframe 
    src="https://www.youtube.com/embed/YbvVJAxMHTE?si=ZQwShvbTnGcK6Yzq"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

This seminar video is the third session of the Diffusion Seminar series. In this session, we cover the basic mathematical and statistical concepts needed to understand upcoming topics such as VAEs and diffusion models. We also explore the ELBO optimization in VAEs in detail, examine the concept of reparameterization, and provide an overview of DDPMs.

Presenter: Jaeik Kim

&nbsp;

## Week 4: Denoising Diffusion Probabilistic Model

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;"> 
  <iframe 
    src="https://www.youtube.com/embed/FjMy7-fWbaM?si=7cXeXqPS5mzPqiJX"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

In this session, we cover Denoising Diffusion Probabilistic Model(DDPM), which is largely acknowledged as the starting place of modern diffusion models. We cover the technical details of DDPM, ranging from forward and reverse process to training and sampling of DDPMs.

Presenter: Yejoon Lee

&nbsp;

## Week 5: DDIM and Score-based Modeling

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;"> 
  <iframe 
    src="https://www.youtube.com/embed/m0uslveHG3I?si=1oFaYSs1tEIU1R2X"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

This seminar video is the fifth week's session of the Diffusion Seminar series. In this session, we begin with a detailed introduction to DDIM and then explore score-based generative modeling and its connection to the diffusion framework. We present the probability flow ODE and demonstrate how DDIM can be derived as a discretized Euler approximation of this continuous process. 

Presenter: Woojin Kim

&nbsp; 

## Week 6: Various Diffusion Space

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;"> 
  <iframe 
    src="https://www.youtube.com/embed/IQJ89b_Isjc?si=YP6Kca8ZBokgREGG"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

In this seminar, we will explore the various diffusion spaces used in diffusion models. Building on the pixel-space diffusion we have discussed so far, we will extend our focus to diffusion in latent space and discrete space, examining their characteristics.

Presenter: Jihwan Hong

&nbsp;

## Week 7: Technical components

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;">
  <iframe 
    src="https://www.youtube.com/embed/hFn3XsWJtIM?si=hK2BrvthmU1j8Pz6"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>


This seminar explored key advancements in diffusion models, focusing on conditioning mechanisms and diffusion distillation techniques. We began by reviewing the mathematical background of diffusion processes and the role of conditioning, emphasizing how class and other auxiliary information can be incorporated into the denoising network to guide generation. We then examined diffusion distillation methods aimed at accelerating sampling without compromising image quality. We also discussed consistency distillation, derived from the Consistency Models framework, which enforces a self-consistency property and a boundary condition along probability flow ODE trajectories.

Presenter: Jaeik Kim

&nbsp;

## Week 8: Diffusion Language Models I

*[The video will be released Soon.]*

Presenter: Woojin Kim

&nbsp;

## Week 9: Diffusion Language Models Ⅱ


*[The video will be released Soon.]*

Presenter: Woojin Kim

&nbsp;

## Week 10: Diffusion Language Models Ⅲ


*[The video will be released Soon.]*

Presenter: Yejoon Lee

&nbsp;

## Week 11: Flow Matching & Token Ordering


*[The video will be released on Oct 14.]*

This presentation introduces the concept of token ordering in large language models (LLMs), examining whether the conventional left-to-right autoregressive generation is truly optimal for diverse downstream tasks. The historical development of left-to-right ordering, from early NLP research to modern transformers, is outlined, followed by discussion of seminal works such as Sigma GPT and Any-Order GPT, which explore arbitrary permutations and demonstrate both the challenges and potential advantages of moving beyond identity ordering. Theoretical connections to combinatorial optimization and group theory are highlighted, along with findings showing that any-order autoregression is more difficult to train yet can outperform left-to-right ordering under curriculum learning or task-specific structures. Future directions are suggested, including balancing efficiency and expressivity, meta-learning order strategies, advancing KV caching for encoder-based masked diffusion models, and extending token ordering research to modalities beyond text.

Presenter: Jaeik Kim

&nbsp;