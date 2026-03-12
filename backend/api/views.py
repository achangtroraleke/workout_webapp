from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, generics, status
from .models import Exercise, Workout, WorkoutLog
from .serializers import ExerciseSerializer, WorkoutSerializer, WorkoutLogSerializer
from .serializers import UserRegistrationSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.db.models import F, Sum

from datetime import date


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Create your views here.
class RegisterUserView(generics.CreateAPIView):
    """
    Handles user registration.
    - Uses AllowAny permission for public access.
    - Uses UserRegistrationSerializer to handle validation and password hashing.
    - New users are automatically assigned the default 'CLIENT' role by the serializer.
    """
    serializer_class = UserRegistrationSerializer
    
    # CRITICAL: This line guarantees public access.
    permission_classes = [AllowAny] 
    
    def create(self, request, *args, **kwargs):
        """
        Overrides the create method to simply use the serializer's logic.
        """
        print(request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=False)
        if not serializer.is_valid():
            print("ERRORS:", serializer.errors)
            return Response(serializer.errors, status=400)
        
        # The serializer's create method handles hashing the password and saving the user.
        self.perform_create(serializer) 
        
        # Respond with success message (or token/user details, depending on flow)
        return Response(
            {"detail": "User registered successfully."},
            status=status.HTTP_201_CREATED
        )

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class WorkoutViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users should only see their own workouts
        return Workout.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['get'])
    def volume(self, request, pk=None):
        """
        Calculates total volume for a specific workout: sum(sets * reps * weight)
        """
        workout = self.get_object()
        
        # We use Django's F expressions to perform the calculation at the database level
        total_volume = workout.logs.aggregate(
            total=Sum(F('sets') * F('reps') * F('weight'))
        )['total'] or 0

        return Response({
            'workout_title': workout.title,
            'total_volume': float(total_volume),
            'unit': 'kg/lbs'
        })
    

class WorkoutLogViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing individual exercise logs.
    """
    serializer_class = WorkoutLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return logs belonging to the current user's workouts
        return WorkoutLog.objects.filter(workout__user=self.request.user)

    def create(self, request, *args, **kwargs):
            # Check if the data is a list (array)
            is_many = isinstance(request.data, list)
            
            # Pass many=True if it's an array
            serializer = self.get_serializer(data=request.data, many=is_many)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)