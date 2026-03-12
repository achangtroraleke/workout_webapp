from rest_framework import serializers
from .models import Exercise, Workout, WorkoutLog, CustomUser

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class WorkoutLogSerializer(serializers.ModelSerializer):
    # This allows the frontend to see 'Bench Press' instead of just ID '5'
    exercise_name = serializers.ReadOnlyField(source='exercise.name')
    
    class Meta:
        model = WorkoutLog
        fields = [
            'id', 
            'workout', 
            'exercise', 
            'exercise_name', 
            'sets', 
            'reps', 
            'weight'
        ]

    def validate_weight(self, value):
        if value < 0:
            raise serializers.ValidationError("Weight cannot be negative. (Unless you've found a way to lift anti-matter!)")
        return value



class WorkoutSerializer(serializers.ModelSerializer):
    logs = WorkoutLogSerializer(many=True, read_only=True)
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Workout
        fields = ['id', 'user', 'title', 'created_at', 'logs']


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer specifically for registering new users.
    Handles password hashing and enforces password confirmation.
    """
    # CRITICAL: This field is for input only and does not exist on the model
    password2 = serializers.CharField(
        style={'input_type': 'password'}, 
        write_only=True
    )

    class Meta:
        model = CustomUser
        fields = (
            'username',
            'email', 
            'password', 
            'password2', # Used for confirmation
         
        )
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        """
        Check that the two passwords match.
        """
     
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        # Remove the extra password2 field before saving
        data.pop('password2')
        return data

    def create(self, validated_data):
        """
        Creates the user and securely hashes the password.
        This fixes the logic previously attempted in the ViewSet.
        """
        # We ensure the new user is given the default 'CLIENT' role for registration
     
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'], # The manager handles hashing here
        
        )
        return user