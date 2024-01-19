# Botpress Server Community on Red Hat OpenShift Dedicated
<p align="left">
<img src="https://img.shields.io/badge/redhat-CC0000?style=for-the-badge&logo=redhat&logoColor=white" alt="Redhat">
<img src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white" alt="kubernetes">
<img src="https://img.shields.io/badge/docker-0db7ed?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white" alt="shell">
<a href="https://www.linkedin.com/in/maximiliano-gregorio-pizarro-consultor-it"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin">   
</p>

El propósito de este proyecto consiste en generar los objetos kubernetes en base a la imagen del nodo del repositorio oficial [botpress](https://botpress.com) para el despliegue sobre las plataformas de contenedores por medio de pipelines Tekton.

Se verifico el funcionamiento en [Sandbox RedHat OpenShift Dedicated](https://developers.redhat.com/developer-sandbox) (Openshift 4.14.1). 

<p align="left">
  <img src="https://github.com/maximilianoPizarro/botpress-server-v12/blob/master/examples/image/Captura2.PNG?raw=true" width="684" title="Run On Openshift">
</p>  

## Instalación

0. Ingresar a tu Sandbox y abrir una terminal web desde la consola de openshift seleccionando en el namespace asignado y ejecutar el siguiente comando para la creación del pipeline tekton

```bash
oc apply -f https://raw.githubusercontent.com/maximilianoPizarro/botpress-server-v12/master/k8s/pipeline.yaml
```

Output:
bash-4.4 ~ $ oc apply -f https://raw.githubusercontent.com/maximilianoPizarro/botpress-server-v12/master/k8s/pipeline.yaml
persistentvolumeclaim/botpress-workspace created
pipeline.tekton.dev/botpress-server created

## Ejecución pipeline Tekton

1. Desde la sección de Pipelines actualizar Parameters con los siguientes parametros con el valor de <NAMESPACE> correspondiente

```bash
IMAGE_NAME=image-registry.openshift-image-registry.svc:5000/<NAMESPACE>/botpress-server
EXTERNAL_URL=botpress-server-<NAMESPACE>.apps.sandbox-m2.ll9k.p1.openshiftapps.com
```

Output:
IMAGE_NAME=image-registry.openshift-image-registry.svc:5000/maximilianopizarro5-dev/botpress-server
EXTERNAL_URL=botpress-server-maximilianopizarro5-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com

2. Desde Pipeline builder instalar y agregar la tasks yq. Importante: no guardar el cambio en pipeline, seleccionar cancelar para que no se actualice el pipeline con yq vacio, ejecutar los pasos 0 y 1 para reconfigurar el pipeline con los valores por defecto.

<p align="left">
  <img src="https://github.com/maximilianoPizarro/botpress-server-v12/blob/master/examples/image/Captura3.PNG?raw=true" width="684" title="Run On Openshift">
</p>  


3. Ejecutar el pipeline botpress-server con el PVC seleccionado

<p align="left">
  <img src="https://github.com/maximilianoPizarro/botpress-server-v12/blob/master/examples/image/Captura4.PNG?raw=true" width="684" title="Run On Openshift">
  <img src="https://github.com/maximilianoPizarro/botpress-server-v12/blob/master/examples/image/Captura5.PNG?raw=true" width="684" title="Run On Openshift">  
</p>  

4. Desde Topology escalar el Deployment a 1 replica

<p align="left">
  <img src="https://github.com/maximilianoPizarro/botpress-server-v12/blob/master/examples/image/Captura6.PNG?raw=true" width="684" title="Run On Openshift">
</p>

5. Ingresar a los logs y verificar que se encuentre operativo, copiar la url y acceder desde el navegador.

<p align="left">
  <img src="https://github.com/maximilianoPizarro/botpress-server-v12/blob/master/examples/image/Captura7.PNG?raw=true" width="684" title="Run On Openshift">
  <img src="https://github.com/maximilianoPizarro/botpress-server-v12/blob/master/examples/image/Captura8.PNG?raw=true" width="684" title="Run On Openshift">  
</p>

Nota: el dns por wildcard que genera openshift pude tener una longitud maxima de 63 caracteres, regenerarlo manualmente de ser necesario apuntando al servicio de botpress-server puerto TCP 3000




[![Open in Gitpod from my fork gitpod.io/maximilianoPizarro/botpress-server-v12](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/maximilianoPizarro/botpress-server-v12)

<p align="left">
  <img src="https://github.com/maximilianoPizarro/botpress-server-v12/blob/master/examples/image/Captura.PNG?raw=true" width="684" title="Run On GitPod">
</p>  


# [Botpress](https://botpress.com/?utm_source=github&utm_medium=organic&utm_campaign=botpress_repo&utm_term=readme) — The building blocks for building chatbots

**IMPORTANT**: With the launch of Botpress Cloud, the documentation for Botpress v12 can now be found [here](https://v12.botpress.com/).

## What is Botpress?

Botpress is the standard developer stack to build, run, and improve conversational AI applications. Powered by natural language understanding, a messaging API, and a fully featured studio, Botpress allows developers and conversation designers around the globe to build remarkable chatbots without compromise.

The fastest & easiest way to get started with Botpress is by signing up for free to **[Botpress Cloud](https://sso.botpress.cloud/registration)**. Alternatively, continue reading for more information about Botpress v12.

<a href='https://botpress.com/?utm_source=github&utm_medium=organic&utm_campaign=botpress_repo&utm_term=readme'><img src='.github/assets/studio.png'></a>

**Out of the box, Botpress v12 includes:**

- Administration panel to orchestrate and monitor your chatbots
- Conversation Studio to design a conversation, manage content, code custom integration
- Easy integration with messaging channels (Messenger, WhatsApp, Slack, Teams, Webchat, Telegram, SMS & more)
- Natural Language Understanding
- Complete list of features and specs [here](https://v12.botpress.com/overview/features)

## Getting Started

There are a few ways to get started with Botpress v12:

- Download the latest binary for your OS [here](https://v12.botpress.com/) and follow the [installation docs](https://v12.botpress.com/overview/quickstart/installation).
- Use the official [Docker image](https://hub.docker.com/r/botpress/server) and follow the [hosting docs](https://v12.botpress.com/going-to-production/deploy/docker-compose)
- Run from sources, follow [build docs](https://v12.botpress.com/going-to-production/deploy/)
- Deploy it in the cloud using these shortlinks:

  <center>
      <hr/>
      <a href="https://marketplace.digitalocean.com/apps/botpress" class="btn btn-default btn-lg">
              <img src=".github/do_button.svg">
      </a>  &nbsp;
      <a href="https://labs.play-with-docker.com?stack=https://raw.githubusercontent.com/botpress/v12/master/examples/docker-compose/docker-compose.yml" class="btn btn-default btn-lg">
        <img src="https://cdn.jsdelivr.net/gh/play-with-docker/stacks@cff22438/assets/images/button.png">
      </a> &nbsp;
  </center>

## Documentation

- [Main Documentation](https://v12.botpress.com/)
- [SDK Reference](https://botpress.com/reference/)
- [Code Examples](https://github.com/botpress/v12/tree/master/examples)
- [Video Tutorials](https://www.youtube.com/c/botpress)



## Community

- [Discord](https://discord.gg/botpress) - Get community support and find answers to your questions
- [Issues](https://github.com/botpress/v12/issues) - Report bugs and file feature requests
- [Blog](https://botpress.com/blog) - How to's, case studies, and announcements
- [Contributing](/.github/CONTRIBUTING.md) - Start contributing to Botpress
- [Partners](/.github/PARTNERS.md) - List of agencies who can help you with Botpress

## License

Botpress is dual-licensed under [AGPLv3](/licenses/LICENSE_AGPL3) and the [Botpress Proprietary License](/licenses/LICENSE_BOTPRESS).

By default, any bot created with Botpress is licensed under AGPLv3, but you may change to the Botpress License from within your bot's web interface in a few clicks.

For more information about how the dual-license works and why it works that way, please see the <a href="https://botpress.com/faq">FAQS</a>.

![](https://api.segment.io/v1/pixel/page?data=eyJ3cml0ZUtleSI6InczR0xQaGFwY1RqTjdZVnJZQVFYU05Wam9yVUFNOXBmIiwidXNlcklkIjoiYW5vbnltb3VzIn0=)
