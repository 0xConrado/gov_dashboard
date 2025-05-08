from django.db import models

class Secretaria(models.Model):
    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

class Servico(models.Model):
    secretaria = models.ForeignKey(Secretaria, related_name='servicos', on_delete=models.CASCADE)
    nome = models.CharField(max_length=255)
    descricao = models.TextField(blank=True)

    def __str__(self):
        return self.nome