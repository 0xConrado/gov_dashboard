from rest_framework import serializers
from .models import Secretaria, Servico

class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = ['id', 'nome', 'descricao']

class SecretariaSerializer(serializers.ModelSerializer):
    servicos = ServicoSerializer(many=True, read_only=True)

    class Meta:
        model = Secretaria
        fields = ['id', 'nome', 'servicos']