// Este archivo registra el service worker para hacer app una PWA

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] es la dirección IPv6 de localhost.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 son todas las direcciones de loopback IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  export function register(config) {
    if ('serviceWorker' in navigator) {
      const swUrl = `/service-worker.js`;
  
      if (isLocalhost) {
        // Esto es localhost. Verifica si el SW existe y es válido.
        checkValidServiceWorker(swUrl, config);
  
        navigator.serviceWorker.ready.then(() => {
          console.log('Esta app está siendo servida en caché por un Service Worker.');
        });
      } else {
        // No es localhost. Solo registra normalmente.
        registerValidSW(swUrl, config);
      }
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('Nuevas actualizaciones están disponibles.');
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                console.log('Contenido cacheado para uso offline.');
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    })
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log('Sin conexión a internet. App funcionando en modo offline.');
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  