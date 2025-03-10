minikube delete

minikube start
# minikube start --driver=hyperv --container-runtime=containerd

# cd pg
# kubectl apply -f deployment.yaml
# cd ..

# Получение окружения Docker Minikube
# & minikube docker-env | Invoke-Expression

# Сборка образов
# docker build -t frontend:prod .\frontend
# docker build -t users:prod .\users
# docker build -t addresses:prod .\addresses
# docker build -t sympathy:prod .\sympathy


# cd users
# kubectl apply -f deployment.yaml
# cd ..
# cd sympathy
# kubectl apply -f deployment.yaml
# cd ..
# cd addresses
# kubectl apply -f deployment.yaml
# cd ..
# cd frontend
# kubectl apply -f deployment.yaml
# cd ..

# minikube dashboard
# minikube service frontend --url
# minikube tunnel
kubectl apply -f addresses.yaml -f pg.yaml -f sympathy.yaml -f users.yaml