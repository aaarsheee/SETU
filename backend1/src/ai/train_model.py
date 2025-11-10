# backend1/src/ai/train_model.py
import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
import tensorflow as tf

# ---------- CONFIG ----------
DATASET_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "dataset")
MODEL_OUT_DIR = os.path.join(os.path.dirname(__file__), "model")
MODEL_OUT_PATH = os.path.join(MODEL_OUT_DIR, "asl_model.h5")
IMG_SIZE = (64, 64)     # small & fast; change to 128 for better accuracy if you have GPU
BATCH_SIZE = 32
EPOCHS = 20
# ----------------------------

os.makedirs(MODEL_OUT_DIR, exist_ok=True)
# Data augmentation and generator
train_datagen = ImageDataGenerator(
    rescale=1.0/255.0,
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.05,
    zoom_range=0.1,
    horizontal_flip=False,
    validation_split=0.15   # 15% of data for validation
)

# Training data
train_gen = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

# Validation data
val_gen = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

num_classes = train_gen.num_classes
print(f"Classes ({num_classes}): {train_gen.class_indices}")


# Build the CNN model
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3)),
    MaxPooling2D((2,2)),
    
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D((2,2)),
    
    Conv2D(128, (3,3), activation='relu'),
    MaxPooling2D((2,2)),
    
    Flatten(),
    Dense(256, activation='relu'),
    Dropout(0.4),
    Dense(num_classes, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Print model summary
model.summary()

# Callbacks for early stopping and saving best model
callbacks = [
    tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=6, restore_best_weights=True),
    tf.keras.callbacks.ModelCheckpoint(MODEL_OUT_PATH, save_best_only=True, monitor='val_loss')
]

# Train the model
model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=EPOCHS,
    callbacks=callbacks
)

# Save final model (ModelCheckpoint already saves best model)
model.save(MODEL_OUT_PATH)
print("Saved model:", MODEL_OUT_PATH)


