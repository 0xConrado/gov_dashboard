from rest_framework import serializers
from .models import Secretaria, Servico

class ServicoSerializer(serializers.ModelSerializer):
    secretaria = serializers.PrimaryKeyRelatedField(queryset=Secretaria.objects.all())

    class Meta:
        model = Servico
        fields = ['id', 'nome', 'descricao', 'secretaria']

class SecretariaSerializer(serializers.ModelSerializer):
    servicos = ServicoSerializer(many=True, read_only=True)

    class Meta:
        model = Secretaria
        fields = ['id', 'nome', 'servicos']