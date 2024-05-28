import json
import requests
from django.http import JsonResponse
from django.core.files.base import ContentFile
from django.shortcuts import render,redirect,get_object_or_404
from .models import TransportDetail,TransportModel,TransportBrand,TransportType,Transmission,Location
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from users.models import AppUser


@csrf_exempt
def transport_list(request):
    transport_list = TransportDetail.objects.all()
    data = []
    for item in transport_list:
        item_data = {
            'id': item.id,
            'brand': item.brand.name,
            'model': item.model.name,
            'bodyType': item.body_type.name,
            'price': item.price,
            'year': item.year,
            'seats': item.seats,
            'location': item.location.name,
            'description': item.description,
            'image': request.build_absolute_uri(item.main_photo.url) if item.main_photo else None,
            'name': item.user.name,
            'surname': item.user.surname,
            'phone': item.user.phone_number
        }
        data.append(item_data)
    return JsonResponse(data,safe=False)


def transport_detail(request,transport_id):
    transport = get_object_or_404(TransportDetail,id=transport_id)
    data = {
        'id': transport.id,
        'brand': transport.brand.name,
        'model': transport.model.name,
        'bodyType': transport.body_type.name,
        'price': transport.price,
        'year': transport.year,
        'seats': transport.seats,
        'location': transport.location.name,
        'description': transport.description,
        'image': request.build_absolute_uri(transport.main_photo.url) if transport.main_photo else None,
        'name': transport.user.name,
        'surname': transport.user.surname,
        'phone': transport.user.phone_nnumber
    }
    return JsonResponse(data)


@csrf_exempt
def add_ad(request):
    if request.method == 'POST' and request.FILES:
        try:
            data = request.POST
            main_photo = request.FILES['main_photo']

            # Проверка существования связанных объектов
            try:
                brand = TransportBrand.objects.get(id=data['brand'])
                model = TransportModel.objects.get(id=data['model'])
                body_type = TransportType.objects.get(id=data['body_type'])
                transmission = Transmission.objects.get(id=data['transmission'])
                location = Location.objects.get(id=data['location'])
            except (TransportBrand.DoesNotExist,TransportModel.DoesNotExist,TransportType.DoesNotExist,
                    Transmission.DoesNotExist) as e:
                return JsonResponse({'message': 'Invalid related object','errors': str(e)},status=400)

            # Получение пользователя по email
            try:
                user = AppUser.objects.get(email=data['email'])
            except AppUser.DoesNotExist:
                return JsonResponse({'message': 'User not found'},status=404)

            # Создание объекта TransportDetail
            transport = TransportDetail(
                brand=brand,
                model=model,
                year=data['year'],
                body_type=body_type,
                seats=data['seats'],
                price=data['price'],
                transmission=transmission,
                location=location,
                description=data['description'],
                user=user
            )

            # Сохранение изображения в поле main_photo
            transport.main_photo.save(main_photo.name,main_photo,save=False)

            # Сохранение записи в базе данных
            transport.save()
            return JsonResponse({'message': 'Successfully Added Product To Database'},status=200)
        except Exception as e:
            return JsonResponse({'message': 'Error processing request','errors': str(e)},status=500)
    else:
        return JsonResponse({'message': 'Invalid request method or missing file'},status=405)


def get_brands(request):
    brands = TransportBrand.objects.values('id','name')
    return JsonResponse({'brands': list(brands)})


def get_models_by_brand(request,brand_id):
    models = TransportModel.objects.filter(brand_id=brand_id).values('id','name')
    return JsonResponse({'models': list(models)})


def get_body_types(request):
    body_types = TransportType.objects.values('id','name')
    return JsonResponse({'bodyTypes': list(body_types)})


def get_transmissions(request):
    transmissions = Transmission.objects.values('id','name')
    return JsonResponse({'transmissions': list(transmissions)})


def get_location(request):
    locations = Location.objects.values('id','name')
    return JsonResponse({'locations': list(locations)})
