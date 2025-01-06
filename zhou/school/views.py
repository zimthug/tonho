from rest_framework.views import APIView
from rest_framework import status
# from rest_framework import permissions
from drf_spectacular.utils import extend_schema

from core.views import StandardizedResponseMixin
from core.serializers import generate_response_serializer
from .models import Term
from .serializers import TermSerializer


class SchoolTermApiView(StandardizedResponseMixin, APIView):
    # permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        request=None,
        responses={200: generate_response_serializer(TermSerializer)},
    )
    def get(self, request):
        term = Term.objects.all()
        serializer = TermSerializer(term, many=True)
        return self.success_response(serializer.data)

    @extend_schema(
        request=TermSerializer,
        responses={201: generate_response_serializer(TermSerializer)},
    )
    def post(self, request):
        serializer = TermSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return self.success_response(
                serializer.data, status_code=status.HTTP_201_CREATED
            )
        return self.error_response(serializer.errors)


class SchoolTermDetailApiView(StandardizedResponseMixin, APIView):
    # permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        request=None,
        responses={200: generate_response_serializer(TermSerializer)},
    )
    def get(self, request, pk):
        term = Term.objects.get(pk=pk)
        if term is None:
            return self.error_response("Term not found", status_code=status.HTTP_404_NOT_FOUND)
        serializer = TermSerializer(term)
        return self.success_response(serializer.data)

    @extend_schema(
        request=TermSerializer,
        methods=["put"],
        responses={201: generate_response_serializer(TermSerializer)},
    )
    def put(self, request, pk):
        term = Term.objects.get(pk=pk)
        if term is None:
            return self.error_response("Term not found", status_code=status.HTTP_404_NOT_FOUND)
        serializer = TermSerializer(term, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return self.success_response(serializer.data)
        return self.error_response(serializer.errors)
