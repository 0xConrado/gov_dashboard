from rest_framework import viewsets
from .models import Secretaria, Servico
from .serializers import SecretariaSerializer, ServicoSerializer

class SecretariaViewSet(viewsets.ModelViewSet):
    queryset = Secretaria.objects.all()
    serializer_class = SecretariaSerializer

class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer