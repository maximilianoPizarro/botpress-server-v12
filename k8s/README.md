# Botpress Server Community on Red Hat OpenShift Dedicated
<p align="left">
<img src="https://img.shields.io/badge/redhat-CC0000?style=for-the-badge&logo=redhat&logoColor=white" alt="Redhat">
<img src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white" alt="kubernetes">
<img src="https://img.shields.io/badge/docker-0db7ed?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white" alt="shell">  
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

