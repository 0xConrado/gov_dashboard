from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from secretarias.views import SecretariaViewSet, ServicoViewSet

router = routers.DefaultRouter()
router.register(r'secretarias', SecretariaViewSet)
router.register(r'servicos', ServicoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),  # Esta linha deve estar presente
    path('api/', include(router.urls)),
]