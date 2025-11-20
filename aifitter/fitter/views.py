"""
Views for the fitter app.

This module contains views for handling image analysis and recommendations.
"""
import cv2
import mediapipe as mp
import numpy as np
import math
import random
from django.shortcuts import render
import base64
import json

KNOWN_EYE_DISTANCE_CM = 6.3
SIZE_CHART = {"XS": 86, "S": 92, "M": 98, "L": 104, "XL": 112, "XXL": 120}

# Expanded color suggestions with more variety
COLOR_SUGGESTIONS = {
    "Warm": [
        "Olive Green", "Gold", "Burnt Orange", "Cream", "Terracotta",
        "Mustard Yellow", "Rust", "Camel", "Coral", "Peach",
        "Maroon", "Burgundy", "Bronze", "Khaki", "Amber",
        "Saffron", "Copper", "Chocolate", "Cinnamon", "Honey"
    ],
    "Cool": [
        "Royal Blue", "Lavender", "Rose", "Gray", "Bright White",
        "Navy Blue", "Slate Gray", "Ice Blue", "Mint Green", "Silver",
        "Plum", "Teal", "Sapphire", "Charcoal", "Pearl White",
        "Electric Blue", "Lilac", "Steel Blue", "Powder Blue", "Arctic White"
    ],
    "Neutral": [
        "Dusty Pink", "Jade Green", "Light Blue", "Off-White", "Taupe",
        "Sage Green", "Mauve", "Beige", "Stone", "Oatmeal",
        "Sand", "Mushroom", "Greige", "Ash", "Porcelain",
        "Clay", "Fog", "Driftwood", "Pebble", "Linen"
    ]
}

# Additional color palettes for different styles
STYLE_PALETTES = {
    "casual": ["Navy Blue", "White", "Gray", "Olive Green", "Denim Blue"],
    "formal": ["Navy", "Charcoal", "White", "Burgundy", "Black"],
    "business": ["Navy", "Gray", "White", "Burgundy", "Olive Green"],
    "summer": ["Sky Blue", "White", "Coral", "Khaki", "Mint Green"],
    "winter": ["Navy", "Crimson", "Forest Green", "Cream", "Charcoal"],
    "spring": ["Pastel Pink", "Mint", "Lavender", "Cream", "Light Blue"],
    "autumn": ["Burgundy", "Olive", "Mustard", "Camel", "Terracotta"]
}

# Complete product image mapping with realistic URLs
PRODUCT_IMAGES = {
    # Shirts Category
    "Shirts": {
        "casual": [
            {
                "name": "Classic Oxford Shirt",
                "colors": ["White", "Light Blue", "Olive Green"],
                "price": "$29.99",
                "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
                "category": "Shirts",
                "tags": ["casual", "best-seller"]
            },
            {
                "name": "Linen Button-Down",
                "colors": ["Cream", "Sky Blue", "Sage Green"],
                "price": "$34.99",
                "image_url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
                "category": "Shirts",
                "tags": ["casual", "summer"]
            }
        ],
        "formal": [
            {
                "name": "Dress Shirt",
                "colors": ["White", "Black", "Navy Blue"],
                "price": "$39.99",
                "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
                "category": "Shirts",
                "tags": ["formal", "business"]
            }
        ]
    },
    
    # T-Shirts Category
    "T-Shirts": {
        "casual": [
            {
                "name": "Premium Cotton Tee",
                "colors": ["Black", "White", "Gray", "Navy Blue"],
                "price": "$19.99",
                "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
                "category": "T-Shirts",
                "tags": ["casual", "best-seller", "under-$30"]
            },
            {
                "name": "V-Neck T-Shirt",
                "colors": ["Burgundy", "Charcoal", "Forest Green"],
                "price": "$17.99",
                "image_url": "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400",
                "category": "T-Shirts",
                "tags": ["casual", "under-$30"]
            }
        ]
    },
    
    # Polos Category
    "Polos": {
        "casual": [
            {
                "name": "Classic Polo Shirt",
                "colors": ["Navy Blue", "White", "Black", "Maroon"],
                "price": "$24.99",
                "image_url": "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
                "category": "Polos",
                "tags": ["casual", "best-seller", "under-$30"]
            },
            {
                "name": "Performance Polo",
                "colors": ["Royal Blue", "Slate Gray", "Olive Green"],
                "price": "$29.99",
                "image_url": "https://images.unsplash.com/photo-1582142306909-195724d1a6ef?w=400",
                "category": "Polos",
                "tags": ["casual", "under-$30"]
            }
        ],
        "business": [
            {
                "name": "Business Casual Polo",
                "colors": ["Navy", "Burgundy", "Charcoal"],
                "price": "$32.99",
                "image_url": "https://images.unsplash.com/photo-1588359348345-e611f8f8443c?w=400",
                "category": "Polos",
                "tags": ["business", "formal"]
            }
        ]
    }
}

# Expanded image database with more products
ADDITIONAL_PRODUCTS = {
    "best_sellers": [
        {
            "name": "Essential Crew Neck Tee",
            "colors": ["White", "Black", "Gray", "Navy"],
            "price": "$15.99",
            "image_url": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400",
            "category": "T-Shirts",
            "tags": ["best-seller", "casual", "under-$30"]
        },
        {
            "name": "Slim Fit Dress Shirt",
            "colors": ["White", "Light Blue", "Pink"],
            "price": "$35.99",
            "image_url": "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400",
            "category": "Shirts",
            "tags": ["best-seller", "formal"]
        },
        {
            "name": "Comfort Fit Polo",
            "colors": ["Navy", "Red", "Green"],
            "price": "$22.99",
            "image_url": "https://images.unsplash.com/photo-1589530789255-45ed64f3b2f1?w=400",
            "category": "Polos",
            "tags": ["best-seller", "casual", "under-$30"]
        }
    ],
    
    "under_30": [
        {
            "name": "Basic Cotton T-Shirt",
            "colors": ["Black", "White", "Heather Gray"],
            "price": "$12.99",
            "image_url": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
            "category": "T-Shirts",
            "tags": ["under-$30", "casual"]
        },
        {
            "name": "Casual Button Shirt",
            "colors": ["Denim Blue", "Olive Green", "Taupe"],
            "price": "$27.99",
            "image_url": "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=400",
            "category": "Shirts",
            "tags": ["under-$30", "casual"]
        },
        {
            "name": "Sport Polo Shirt",
            "colors": ["Royal Blue", "White", "Black"],
            "price": "$19.99",
            "image_url": "https://images.unsplash.com/photo-1441984904996-e0b59743541e?w=400",
            "category": "Polos",
            "tags": ["under-$30", "casual"]
        }
    ],
    
    "seasonal": [
        {
            "name": "Summer Linen Shirt",
            "colors": ["Cream", "Sky Blue", "Sage Green"],
            "price": "$31.99",
            "image_url": "https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=400",
            "category": "Shirts",
            "tags": ["summer", "casual"]
        },
        {
            "name": "Winter Flannel Shirt",
            "colors": ["Burgundy", "Forest Green", "Navy"],
            "price": "$33.99",
            "image_url": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
            "category": "Shirts",
            "tags": ["winter", "casual"]
        }
    ]
}

# Complete category mapping
CATEGORY_IMAGES = {
    "All": [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",  # Clothing rack
        "https://images.unsplash.com/photo-1558769132-cb25c5d1d5c1?w=400",    # Store interior
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc3a?w=400"  # Various clothes
    ],
    "Shirts": [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400"
    ],
    "T-Shirts": [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400"
    ],
    "Polos": [
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
        "https://images.unsplash.com/photo-1582142306909-195724d1a6ef?w=400",
        "https://images.unsplash.com/photo-1588359348345-e611f8f8443c?w=400"
    ],
    "Casual": [
        "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400",
        "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=400"
    ],
    "Formal": [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
        "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    ]
}

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

def calculate_distance_pixels(p1, p2):
    return math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)

def classify_skin_tone(rgb_color):
    r, g, b = rgb_color
    # Enhanced skin tone classification
    if r > 180 and g > 150 and b < 120: return "Warm"
    elif r < 160 and g < 140 and b > 120: return "Cool"
    elif abs(r - g) < 30 and abs(g - b) < 30: return "Neutral"
    elif r > g and g > b: return "Warm"
    elif b > r and b > g: return "Cool"
    else: return "Neutral"

def get_shirt_size(height_cm, chest_circumference_cm):
    if height_cm < 160: base_size = "XS"
    elif 160 <= height_cm < 175: base_size = "S"
    elif 175 <= height_cm < 185: base_size = "M"
    elif 185 <= height_cm < 195: base_size = "L"
    else: base_size = "XL"
    
    for size, max_chest in sorted(SIZE_CHART.items(), key=lambda item: item[1]):
        if chest_circumference_cm <= max_chest:
            if list(SIZE_CHART.keys()).index(size) > list(SIZE_CHART.keys()).index(base_size):
                 return size
            else:
                 return base_size
    return "XXL"

def get_random_colors(skin_tone_category, num_colors=8, include_styles=True):
    """Get random colors based on skin tone with style variations"""
    base_colors = COLOR_SUGGESTIONS.get(skin_tone_category, [])
    
    if len(base_colors) < num_colors:
        # If not enough base colors, supplement with other categories
        all_colors = []
        for category_colors in COLOR_SUGGESTIONS.values():
            all_colors.extend(category_colors)
        base_colors = list(set(base_colors + all_colors))  # Remove duplicates
    
    # Select random colors from base colors
    selected_colors = random.sample(base_colors, min(num_colors, len(base_colors)))
    
    # Add style-based colors for variety
    if include_styles and len(selected_colors) < num_colors:
        style = random.choice(list(STYLE_PALETTES.keys()))
        style_colors = STYLE_PALETTES[style]
        additional_colors = random.sample(style_colors, min(num_colors - len(selected_colors), len(style_colors)))
        selected_colors.extend(additional_colors)
    
    return selected_colors[:num_colors]

def get_color_hex_codes(colors):
    """Convert color names to hex codes for display"""
    color_hex_map = {
        # Warm colors
        "Olive Green": "#808000", "Gold": "#FFD700", "Burnt Orange": "#CC5500", 
        "Cream": "#FFFDD0", "Terracotta": "#E2725B", "Mustard Yellow": "#FFDB58",
        "Rust": "#B7410E", "Camel": "#C19A6B", "Coral": "#FF7F50", "Peach": "#FFE5B4",
        "Maroon": "#800000", "Burgundy": "#800020", "Bronze": "#CD7F32", "Khaki": "#F0E68C",
        "Amber": "#FFBF00", "Saffron": "#F4C430", "Copper": "#B87333", "Chocolate": "#D2691E",
        "Cinnamon": "#D2691E", "Honey": "#FFC30B",
        
        # Cool colors
        "Royal Blue": "#4169E1", "Lavender": "#E6E6FA", "Rose": "#FF007F", 
        "Gray": "#808080", "Bright White": "#FFFFFF", "Navy Blue": "#000080",
        "Slate Gray": "#708090", "Ice Blue": "#99FFFF", "Mint Green": "#98FF98", 
        "Silver": "#C0C0C0", "Plum": "#DDA0DD", "Teal": "#008080", "Sapphire": "#0F52BA",
        "Charcoal": "#36454F", "Pearl White": "#F8F6F0", "Electric Blue": "#7DF9FF",
        "Lilac": "#C8A2C8", "Steel Blue": "#4682B4", "Powder Blue": "#B0E0E6", 
        "Arctic White": "#F0F8FF",
        
        # Neutral colors
        "Dusty Pink": "#D8B4B4", "Jade Green": "#00A86B", "Light Blue": "#ADD8E6", 
        "Off-White": "#FAF9F6", "Taupe": "#483C32", "Sage Green": "#9CAF88",
        "Mauve": "#E0B0FF", "Beige": "#F5F5DC", "Stone": "#928E85", "Oatmeal": "#D0C4AB",
        "Sand": "#C2B280", "Mushroom": "#BDAB9B", "Greige": "#B2AEA3", "Ash": "#B2BEB5",
        "Porcelain": "#F7F7F7", "Clay": "#B66A50", "Fog": "#DCDCDC", "Driftwood": "#A67B5B",
        "Pebble": "#D8D0C1", "Linen": "#FAF0E6",
        
        # Additional style colors
        "Sky Blue": "#87CEEB", "Crimson": "#DC143C", "Forest Green": "#228B22",
        "Pastel Pink": "#FFD1DC", "Mint": "#3EB489", "Denim Blue": "#1560BD",
        "Black": "#000000", "White": "#FFFFFF", "Navy": "#000080"
    }
    
    hex_codes = []
    for color in colors:
        hex_code = color_hex_map.get(color, "#CCCCCC")  # Default gray if not found
        hex_codes.append(hex_code)
    
    return hex_codes

def get_recommended_products(size, skin_tone, style_preference=None, price_range=None):
    """Get product recommendations based on user measurements and preferences"""
    recommended_products = []
    
    # Get products matching the size
    for category, styles in PRODUCT_IMAGES.items():
        for style_products in styles.values():
            for product in style_products:
                # Simple size matching - in real app, you'd have size variants
                recommended_products.append(product)
    
    # Add additional products
    recommended_products.extend(ADDITIONAL_PRODUCTS["best_sellers"])
    
    # Filter by price range
    if price_range == "under_30":
        recommended_products = [p for p in recommended_products if float(p["price"].replace("$", "")) < 30]
    
    # Filter by style preference
    if style_preference and style_preference in STYLE_PALETTES:
        style_colors = STYLE_PALETTES[style_preference]
        style_matched = []
        for product in recommended_products:
            if any(color in style_colors for color in product["colors"]):
                style_matched.append(product)
        if style_matched:  # Only use style filter if we have matches
            recommended_products = style_matched
    
    # Limit to 6 products for display
    return recommended_products[:6]

def analyze_person_image(image_array):
    results_dict = {}
    annotated_image = image_array.copy()
    
    image_rgb = cv2.cvtColor(image_array, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)
    
    image_height, image_width, _ = image_array.shape

    if not results.pose_landmarks:
        return {"error": "Could not detect a person in the image. Please try another one."}, None

    # Draw landmarks on the annotated image
    mp_drawing.draw_landmarks(
        annotated_image,
        results.pose_landmarks,
        mp_pose.POSE_CONNECTIONS,
        landmark_drawing_spec=mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
        connection_drawing_spec=mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
    )

    landmarks = results.pose_landmarks.landmark

    # --- 1. Measurement Calculation ---
    try:
        left_eye = landmarks[mp_pose.PoseLandmark.LEFT_EYE.value]
        right_eye = landmarks[mp_pose.PoseLandmark.RIGHT_EYE.value]
        left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value]
        right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value]
        nose = landmarks[mp_pose.PoseLandmark.NOSE.value]
        left_ankle = landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value]
        right_ankle = landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value]

        eye_dist_pixels = calculate_distance_pixels(left_eye, right_eye) * image_width
        pixels_per_cm = eye_dist_pixels / KNOWN_EYE_DISTANCE_CM

        person_height_pixels = abs(nose.y - (left_ankle.y + right_ankle.y)/2) * image_height
        person_height_cm = person_height_pixels / pixels_per_cm

        shoulder_width_pixels = calculate_distance_pixels(left_shoulder, right_shoulder) * image_width
        shoulder_width_cm = shoulder_width_pixels / pixels_per_cm
        chest_circumference_cm = shoulder_width_cm * math.pi
        
        results_dict['height'] = f"{person_height_cm:.1f} cm"
        results_dict['chest'] = f"{chest_circumference_cm:.1f} cm"
        shirt_size = get_shirt_size(person_height_cm, chest_circumference_cm)
        results_dict['size'] = shirt_size

    except (KeyError, IndexError):
         return {"error": "Could not detect all required body landmarks. Ensure the full body is visible."}, annotated_image

    # --- 2. Skin Tone Analysis ---
    try:
        cheek_x = int(nose.x * image_width) - 50
        cheek_y = int(nose.y * image_height)
        
        cheek_roi = image_array[cheek_y-5:cheek_y+5, cheek_x-5:cheek_x+5]
        avg_color = np.average(np.average(cheek_roi, axis=0), axis=0)
        avg_rgb_color = (int(avg_color[2]), int(avg_color[1]), int(avg_color[0]))
        
        skin_tone_category = classify_skin_tone(avg_rgb_color)
        
        # Get random colors based on skin tone
        recommended_colors = get_random_colors(skin_tone_category, num_colors=8)
        color_hex_codes = get_color_hex_codes(recommended_colors)

        results_dict['skin_tone'] = skin_tone_category
        results_dict['colors'] = ", ".join(recommended_colors)
        results_dict['color_hex_codes'] = color_hex_codes
        results_dict['color_hex_codes_json'] = json.dumps(color_hex_codes)
        
        # Get product recommendations
        recommended_products = get_recommended_products(
            size=shirt_size, 
            skin_tone=skin_tone_category,
            price_range="under_30"  # Default to affordable options
        )
        results_dict['recommended_products'] = recommended_products
        results_dict['recommended_products_json'] = json.dumps(recommended_products)
    
    except Exception as e:
        print(f"Skin tone analysis error: {e}")
        results_dict['skin_tone'] = "N/A"
        results_dict['colors'] = "Could not analyze skin tone."
        # Provide default colors
        default_colors = ["Navy Blue", "Gray", "White", "Black", "Olive Green"]
        results_dict['color_hex_codes'] = get_color_hex_codes(default_colors)
        results_dict['color_hex_codes_json'] = json.dumps(get_color_hex_codes(default_colors))
        
        # Provide default product recommendations
        default_products = ADDITIONAL_PRODUCTS["best_sellers"][:3]
        results_dict['recommended_products'] = default_products
        results_dict['recommended_products_json'] = json.dumps(default_products)

    return results_dict, annotated_image

def index(request):
    context = {}
    if request.method == 'POST':
        image_data = None
        
        # Handle file upload
        if 'image_upload' in request.FILES:
            uploaded_file = request.FILES['image_upload']
            image_data = uploaded_file.read()

        elif 'image_data' in request.POST:
            base64_data = request.POST.get('image_data').split(',')[1]
            image_data = base64.b64decode(base64_data)

        if image_data:
            np_arr = np.frombuffer(image_data, np.uint8)
            cv2_image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

            analysis_results, processed_cv2_image = analyze_person_image(cv2_image)
            context['results'] = analysis_results

            if processed_cv2_image is not None:
                _, buffer = cv2.imencode('.jpg', processed_cv2_image)
                encoded_image = base64.b64encode(buffer).decode('utf-8')
                image_data_url = f"data:image/jpeg;base64,{encoded_image}"
                context['processed_image'] = image_data_url

    return render(request, 'fitter/index.html', context)