## K8s нужен для:
- Автоматического развертывания приложений в контейнерах на разных серверах
- Распределения нагрузки по нескольким серверам (Равномерная нагрузка между серверами)
- Автоматическом масштабировании развернутых приложений (Нагрузка возрастает - создаются дополнитльеные контейнеры на серверах)
- Мониторинга и проверке работоспособности контейнеров (Автоматическое пересоздание контейнеров)

## Среды запуска контейнеров
- Docker
- CRI-O
- containerD

## Pod
В поде может быть несколько контейнеров. Есть общие тома для работы с данными. Т.е. несколько контейнеров могут записывать и считывать инофрмацию из них.
Так же есть общий IP адрес для всех контейнеров внутри пода.
*Рекомендация: 1 под - 1 контейнер.

## Кластер
Состоит из узлов (нода). В каждом узле создаются поды.
Узлы конрольируются главным узлом.

## Общая схема роботы k8s
![alt text](https://user-images.githubusercontent.com/53555895/82279296-29f9cd80-99c7-11ea-91f0-c83ec1acc703.jpg)

## Сервисы k8s
В узлах есть сервисы:
- kubelet (Коммуникации между узлами)
- kube-proxy (Сетевые ресурсы в рамках каждого узла)
- container runtime (создание и контроь контейнеров -> Docker, CRI-O, ContainerD)
Дополнитлеьно в главном узле есть сервисы:
API Server - рабочие узлы посредсвтом kubelet взаимодействуют с API Server главного узла.
Scheduler - Планировщик. Планировать и распределять нагрузку между кластерами.
Kube controller Manager - ?
Cloud controller manager - ?
etcd - Сохранение логов.

## Управление кластером k8s, но уже пользователем
Утилита kubectl позволяет управлять кластером.
Kubectl свзяывается с API Server главного узла по HTTPS.
Есть графическая надстрйока для kubectl - Dashboard.

## Локальный запуск кластера
Minikube — это упрощённый инструмент для запуска полноценного кластера Kubernetes на локальной машине. Он был разработан, чтобы облегчить разработку, тестирование и отладку приложений, работающих на Kubernetes, в локальной среде. Minikube позволяет быстро развернуть простой кластер Kubernetes на своей локальной машине. Такой кластер хорошо подойдёт для первого знакомства с Kubernetes или для локальной разработки приложений.

В качестве вирутальной машины можно использовать тот же Docker.
Т.е кластер будет создан в одном докер контейнере (контейнеры в контейнере).
Так же есть virtualbox, hyper-v, parallels и т.д.

После установки kubectl и minikube на ПК достаточно выполнить команду minikube start для запуска лоакльного кластера в Docker.

Полезный следующие  команды:
- kubectl get namespaces (Получить пространства имен)
- kubectl get nodes (получить узлы)
- kubectl get pods --namespace=kube-system (получить поды в пространстве имен kube-system)
- kubectl describe pod nginx (детальная информация о поде nginx)
- kubectl delete pod nginx (удалить под nginx)
- kubectl create deployment my-nginx-deploy --image=nginx создать деплоймент на основании образа nginx
- kubectl describe deploy my-nginx-deploy (описание деплоймента. Стоит обратить внимание на поле replicas. Будут отображены кол-ва желамое кол-во подов|обновленные поды|всего подов|недостуцпные поды)
- kubectl scale deploy my-nginx-deploy --replicas=5 (увеличение реплик пода до 5)

Имя пода состоит из:
namePod-id набора реплик-уникальный id пода