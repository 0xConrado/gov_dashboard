from django.db import models

class Secretaria(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)

    def __str__(self):
        return self.nome

class Servico(models.Model):
    secretaria = models.ForeignKey(Secretaria, on_delete=models.CASCADE, related_name='servicos')
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)

    def __str__(self):
        return f"{self.nome} ({self.secretaria.nome})"