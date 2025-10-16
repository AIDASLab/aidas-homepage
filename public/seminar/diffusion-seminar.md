---
title: "Diffusion Seminar"
date: "2025-07-25"
summary: "07/2025 – 09/2025 | Summer 2025 Diffusion Tutorial"
thumbnail: "seminar/thumbnails/diffusion_seminar.png"
---

# Curriculum

1. [Introduction To Diffusion Model](#week-1-introduction-to-diffusion-model)
2. [Generative Modeling I](#week-2-generative-modeling-i)
3. [Generative Modeling Ⅱ](#week-3-generative-modeling-ⅱ)
4. [Denoising Diffusion Probabilistic Model](#week-4-denoising-diffusion-probabilistic-model)
5. [DDIM and Score-based Modeling](#week-5-ddim-and-score-based-modeling)
6. [Various Diffusion Space](#week-6-various-diffusion-space)
7. [Technical components](#week-7-technical-components)
8. [Diffusion Language Models I](#week-8-diffusion-language-models-i)
9. [Diffusion Language Models Ⅱ](#week-9-diffusion-language-models-ⅱ)
10. [Diffusion Language Models Ⅲ](#week-10-diffusion-language-models-ⅲ)
11. [Flow Matching & Token Ordering](#week-11-flow-matching--token-ordering)
12. [Invited Talk – Foundations of Diffusion Language Models](#week-12-invited-talk--foundations-of-diffusion-language-models)

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

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;">
  <iframe 
    src="https://www.youtube.com/embed/UUm-oXy8vHs?si=5t2V6SlT1QdKarlt"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

This seminar video is the eighth week's session of the Diffusion Seminar series. In this session, we introduce the basics of diffusion language models, discuss how diffusion has been adapted from the image to the text domain with discrete token spaces, and cover continuous diffusion language model formulations.

Presenter: Woojin Kim

&nbsp;

## Week 9: Diffusion Language Models Ⅱ


<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;">
  <iframe 
    src="https://www.youtube.com/embed/Ygi4IPFYK6k?si=PtEzxe6g-5f5S04Q"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

This seminar video is the ninth week's session of the Diffusion Seminar series. In this session, we focus on discrete diffusion language models, explore their continuous-time extensions, and present masked diffusion objectives as a bridge to established NLP training paradigms.

Presenter: Woojin Kim

&nbsp;

## Week 10: Diffusion Language Models Ⅲ


<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;">
  <iframe 
    src="https://www.youtube.com/embed/QTw704X3liM?si=DpbpBUToeiDCF-Sw"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

This talk covers three flavors of diffusion language model(DLM) sampling. It reviews the basics of DLM, and the semi-AR sampling variants used in LLaDA and fast-dLLM. It further introduces the block diffusion, the hybrid form of diffusion LM and autoregressive LM.

Presenter: Yejoon Lee

&nbsp;

## Week 11: Flow Matching & Token Ordering


<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;">
  <iframe 
    src="https://www.youtube.com/embed/4he1JoFYTQU?si=DjpVpO_341B-wbrg"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

This presentation introduces the concept of token ordering in large language models (LLMs), examining whether the conventional left-to-right autoregressive generation is truly optimal for diverse downstream tasks. The historical development of left-to-right ordering, from early NLP research to modern transformers, is outlined, followed by discussion of seminal works such as Sigma GPT and Any-Order GPT, which explore arbitrary permutations and demonstrate both the challenges and potential advantages of moving beyond identity ordering. Theoretical connections to combinatorial optimization and group theory are highlighted, along with findings showing that any-order autoregression is more difficult to train yet can outperform left-to-right ordering under curriculum learning or task-specific structures. Future directions are suggested, including balancing efficiency and expressivity, meta-learning order strategies, advancing KV caching for encoder-based masked diffusion models, and extending token ordering research to modalities beyond text.

Presenter: Jaeik Kim

&nbsp;

## Week 12: Invited Talk – Foundations of Diffusion Language Models

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto;">
  <iframe 
    src="https://www.youtube.com/embed/X_kczHxISc0?si=Hk6Dq0PIRPrE25u-"
    style="position: absolute; top:0; left:0; width:100%; height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

This presentation introduces the concept of token ordering in large language models (LLMs), examining whether the conventional left-to-right autoregressive generation is truly optimal for diverse downstream tasks. The historical development of left-to-right ordering, from early NLP research to modern transformers, is outlined, followed by discussion of seminal works such as Sigma GPT and Any-Order GPT, which explore arbitrary permutations and demonstrate both the challenges and potential advantages of moving beyond identity ordering. Theoretical connections to combinatorial optimization and group theory are highlighted, along with findings showing that any-order autoregression is more difficult to train yet can outperform left-to-right ordering under curriculum learning or task-specific structures. Future directions are suggested, including balancing efficiency and expressivity, meta-learning order strategies, advancing KV caching for encoder-based masked diffusion models, and extending token ordering research to modalities beyond text.

Presenter: [Dr. Subham Sahoo](https://s-sahoo.com/)

&nbsp;
