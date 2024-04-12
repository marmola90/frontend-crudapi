// vite.config.ts
import { defineConfig } from "file:///C:/Users/amarmol/OneDrive%20-%20Comisi%C3%B3n%20Nacional%20de%20Bancos%20y%20Seguros%20(CNBS)/Documentos/Proyectos/Apps/CRUD_Modulos/frontend-crudapi/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/amarmol/OneDrive%20-%20Comisi%C3%B3n%20Nacional%20de%20Bancos%20y%20Seguros%20(CNBS)/Documentos/Proyectos/Apps/CRUD_Modulos/frontend-crudapi/node_modules/@vitejs/plugin-react/dist/index.mjs";
var replacePlugin = (mode) => {
  return {
    name: "html-inject-env",
    transformIndexHtml: (html) => {
      if (mode === "production") {
        return html.replace(
          "<!-- REACT_ENV -->",
          `<script src="./config/front.env.js"></script>`
        );
      }
      return null;
    }
  };
};
var vite_config_default = defineConfig(({ mode }) => ({
  plugins: [react(), replacePlugin(mode)],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3001
    // you can replace this port with any port
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWFybW9sXFxcXE9uZURyaXZlIC0gQ29taXNpXHUwMEYzbiBOYWNpb25hbCBkZSBCYW5jb3MgeSBTZWd1cm9zIChDTkJTKVxcXFxEb2N1bWVudG9zXFxcXFByb3llY3Rvc1xcXFxBcHBzXFxcXENSVURfTW9kdWxvc1xcXFxmcm9udGVuZC1jcnVkYXBpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWFybW9sXFxcXE9uZURyaXZlIC0gQ29taXNpXHUwMEYzbiBOYWNpb25hbCBkZSBCYW5jb3MgeSBTZWd1cm9zIChDTkJTKVxcXFxEb2N1bWVudG9zXFxcXFByb3llY3Rvc1xcXFxBcHBzXFxcXENSVURfTW9kdWxvc1xcXFxmcm9udGVuZC1jcnVkYXBpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWFybW9sL09uZURyaXZlJTIwLSUyMENvbWlzaSVDMyVCM24lMjBOYWNpb25hbCUyMGRlJTIwQmFuY29zJTIweSUyMFNlZ3Vyb3MlMjAoQ05CUykvRG9jdW1lbnRvcy9Qcm95ZWN0b3MvQXBwcy9DUlVEX01vZHVsb3MvZnJvbnRlbmQtY3J1ZGFwaS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5cbmNvbnN0IHJlcGxhY2VQbHVnaW4gPSAobW9kZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwiaHRtbC1pbmplY3QtZW52XCIsXG4gICAgdHJhbnNmb3JtSW5kZXhIdG1sOiAoaHRtbCkgPT4ge1xuICAgICAgaWYgKG1vZGUgPT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoXG4gICAgICAgICAgXCI8IS0tIFJFQUNUX0VOViAtLT5cIixcbiAgICAgICAgICBgPHNjcmlwdCBzcmM9XCIuL2NvbmZpZy9mcm9udC5lbnYuanNcIj48L3NjcmlwdD5gXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgcmVwbGFjZVBsdWdpbihtb2RlKV0sXG4gIHNlcnZlcjoge1xuICAgIHdhdGNoOiB7XG4gICAgICB1c2VQb2xsaW5nOiB0cnVlLFxuICAgIH0sXG4gICAgaG9zdDogdHJ1ZSwgLy8gbmVlZGVkIGZvciB0aGUgRG9ja2VyIENvbnRhaW5lciBwb3J0IG1hcHBpbmcgdG8gd29ya1xuICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgcG9ydDogMzAwMSwgLy8geW91IGNhbiByZXBsYWNlIHRoaXMgcG9ydCB3aXRoIGFueSBwb3J0XG4gIH1cbn0pKSJdLAogICJtYXBwaW5ncyI6ICI7QUFBeWxCLFNBQVMsb0JBQW9CO0FBQ3RuQixPQUFPLFdBQVc7QUFFbEIsSUFBTSxnQkFBZ0IsQ0FBQyxTQUFTO0FBQzlCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLG9CQUFvQixDQUFDLFNBQVM7QUFDNUIsVUFBSSxTQUFTLGNBQWM7QUFDekIsZUFBTyxLQUFLO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNGO0FBR0EsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxTQUFTLENBQUMsTUFBTSxHQUFHLGNBQWMsSUFBSSxDQUFDO0FBQUEsRUFDdEMsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsWUFBWTtBQUFBLElBQ2Q7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBO0FBQUEsRUFDUjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
